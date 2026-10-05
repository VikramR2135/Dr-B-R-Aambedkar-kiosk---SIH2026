// services/websocket.ts
//
// Thin wrapper around a WebSocket connection to the existing backend's
// real-time channel (used, per the project brief, for session/recording
// state). This prototype UI does not require a live socket to function —
// every screen degrades gracefully to mock/demo mode when disconnected —
// but the manager below is ready to be pointed at the real endpoint.

import { WS_URL } from "./api";
import { ConnectionStatus } from "@/types";

type Listener = (status: ConnectionStatus) => void;

class ArchiveSocketManager {
  private socket: WebSocket | null = null;
  private listeners: Set<Listener> = new Set();
  private status: ConnectionStatus = "disconnected";

  connect(url: string = WS_URL) {
    if (typeof window === "undefined") return;
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

    this.setStatus("connecting");
    try {
      this.socket = new WebSocket(url);
      this.socket.onopen = () => this.setStatus("connected");
      this.socket.onclose = () => this.setStatus("disconnected");
      this.socket.onerror = () => this.setStatus("error");
    } catch {
      this.setStatus("error");
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.setStatus("disconnected");
  }

  getStatus() {
    return this.status;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.status);
    return () => this.listeners.delete(listener);
  }

  private setStatus(status: ConnectionStatus) {
    this.status = status;
    this.listeners.forEach((l) => l(status));
  }
}

export const archiveSocket = new ArchiveSocketManager();
