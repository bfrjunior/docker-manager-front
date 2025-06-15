import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DockerService } from '../../services/docker.service';
import { Router, ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Container } from '../../models/container.model';

@Component({
  selector: 'app-containers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {
  containers: Container[] = [];
  showAll: boolean = true;
  newContainerImage: string = '';

  constructor(
    private dockerService: DockerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadContainers();
  }

  loadContainers(): void {
    this.dockerService.getContainers(this.showAll).subscribe({
      next: (data) => {
        this.containers = data;
      },
      error: (error) => {
        console.error('Error fetching containers:', error);
      }
    });
  }

  startContainer(id: string): void {
    this.dockerService.startContainer(id).subscribe({
      next: () => {
        this.loadContainers();
      },
      error: (error) => {
        console.error('Error starting container:', error);
        alert('Error starting container. Check console for details.');
      }
    });
  }

  stopContainer(id: string): void {
    this.dockerService.stopContainer(id).subscribe({
      next: () => {
        this.loadContainers();
      },
      error: (error) => {
        console.error('Error stopping container:', error);
        alert('Error stopping container. Check console for details.');
      }
    });
  }

  deleteContainer(id: string): void {
    if (confirm('Are you sure you want to delete this container?')) {
      this.dockerService.deleteContainer(id).subscribe({
        next: () => {
          this.loadContainers();
        },
        error: (error) => {
          console.error('Error deleting container:', error);
          alert('Error deleting container. Check console for details.');
        }
      });
    }
  }

  createContainer(): void {
    if (!this.newContainerImage) {
      alert('Please enter an image name');
      return;
    }

    this.dockerService.createContainer(this.newContainerImage).subscribe({
      next: () => {
        this.newContainerImage = '';
        this.loadContainers();
      },
      error: (error) => {
        console.error('Error creating container:', error);
        alert('Error creating container. Check console for details.');
      }
    });
  }

  formatDate(timestamp: number): string {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  }
}