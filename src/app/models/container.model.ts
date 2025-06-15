export interface Container {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  State: string;
  Status: string;
  Ports: Port[];
  Labels: Record<string, string>;
  HostConfig?: HostConfig;
}

export interface Port {
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
}

export interface HostConfig {
  NetworkMode: string;
}