import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerService } from '../../services/docker.service';
import { Container } from '../../models/container.model';

@Component({
  selector: 'app-container-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" *ngIf="container">
      <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Container Details: {{ container.Id.substring(0, 12) }}</h5>
        <button class="btn btn-sm btn-light" (click)="goBack()">Back</button>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <p><strong>ID:</strong> {{ container.Id }}</p>
            <p><strong>Name:</strong> {{ container.Names.join(', ') }}</p>
            <p><strong>Image:</strong> {{ container.Image }}</p>
            <p><strong>Created:</strong> {{ formatDate(container.Created) }}</p>
            <p><strong>Status:</strong> {{ container.State || container.Status }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Ports:</strong> {{ formatPorts(container.Ports) }}</p>
            <p><strong>Network Mode:</strong> {{ container.HostConfig && container.HostConfig.NetworkMode || 'default' }}</p>
            <div class="mt-3">
              <button *ngIf="container.State !== 'running'" class="btn btn-success me-2" (click)="startContainer()">Start</button>
              <button *ngIf="container.State === 'running'" class="btn btn-warning me-2" (click)="stopContainer()">Stop</button>
              <button class="btn btn-danger" (click)="deleteContainer()">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContainerDetailComponent implements OnInit {
  container: Container | null = null;
  containerId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dockerService: DockerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.containerId = params['id'];
        this.loadContainerDetails();
      }
    });
  }

  loadContainerDetails(): void {
    this.dockerService.getContainerById(this.containerId).subscribe({
      next: (data) => {
        this.container = data;
      },
      error: (error) => {
        console.error('Error fetching container details:', error);
        this.router.navigate(['/containers']);
      }
    });
  }

  formatPorts(ports: any[]): string {
    if (!ports || ports.length === 0) return 'None';
    return ports.map(p => `${p.PublicPort || ''}:${p.PrivatePort}`).join(', ');
  }

  startContainer(): void {
    if (!this.containerId) return;
    
    this.dockerService.startContainer(this.containerId).subscribe({
      next: () => {
        this.loadContainerDetails();
      },
      error: (error) => {
        console.error('Error starting container:', error);
        alert('Error starting container. Check console for details.');
      }
    });
  }

  stopContainer(): void {
    if (!this.containerId) return;
    
    this.dockerService.stopContainer(this.containerId).subscribe({
      next: () => {
        this.loadContainerDetails();
      },
      error: (error) => {
        console.error('Error stopping container:', error);
        alert('Error stopping container. Check console for details.');
      }
    });
  }

  deleteContainer(): void {
    if (!this.containerId) return;
    
    if (confirm('Are you sure you want to delete this container?')) {
      this.dockerService.deleteContainer(this.containerId).subscribe({
        next: () => {
          this.router.navigate(['/containers']);
        },
        error: (error) => {
          console.error('Error deleting container:', error);
          alert('Error deleting container. Check console for details.');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/containers']);
  }

  formatDate(timestamp: number): string {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  }
}