import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DockerService } from '../../services/docker.service';
import { Container } from '../../models/container.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  runningContainers: number = 0;
  stoppedContainers: number = 0;
  totalImages: number = 0;
  newContainerImage: string = '';
  imageFilter: string = '';
  containers: Container[] = [];

  constructor(private dockerService: DockerService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Get containers
    this.dockerService.getContainers(true).subscribe({
      next: (containers) => {
        this.containers = containers;
        this.runningContainers = containers.filter(c => c.State === 'running').length;
        this.stoppedContainers = containers.length - this.runningContainers;
      },
      error: (error) => {
        console.error('Error fetching containers:', error);
      }
    });

    // Get images
    this.dockerService.getImages().subscribe({
      next: (images) => {
        this.totalImages = images.length;
      },
      error: (error) => {
        console.error('Error fetching images:', error);
      }
    });
  }

  createNewContainer(): void {
    if (!this.newContainerImage) {
      alert('Please enter an image name');
      return;
    }

    this.dockerService.createContainer(this.newContainerImage).subscribe({
      next: () => {
        alert('Container created successfully');
        this.newContainerImage = '';
        this.loadDashboardData();
      },
      error: (error) => {
        console.error('Error creating container:', error);
        alert('Error creating container. Check console for details.');
      }
    });
  }

  filterImagesByName(): void {
    if (!this.imageFilter) {
      this.loadDashboardData();
      return;
    }

    this.dockerService.filterImages(this.imageFilter).subscribe({
      next: (images) => {
        this.totalImages = images.length;
      },
      error: (error) => {
        console.error('Error filtering images:', error);
      }
    });
  }
  
  formatDate(timestamp: number): string {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  }
}