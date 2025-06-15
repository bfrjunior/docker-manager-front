import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DockerService } from '../../services/docker.service';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  images: Image[] = [];
  filterName: string = '';

  constructor(private dockerService: DockerService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.dockerService.getImages().subscribe({
      next: (data) => {
        this.images = data;
      },
      error: (error) => {
        console.error('Error fetching images:', error);
      }
    });
  }

  filterImages(): void {
    if (!this.filterName) {
      this.loadImages();
      return;
    }

    this.dockerService.filterImages(this.filterName).subscribe({
      next: (data) => {
        this.images = data;
      },
      error: (error) => {
        console.error('Error filtering images:', error);
      }
    });
  }

  resetFilter(): void {
    this.filterName = '';
    this.loadImages();
  }

  createContainerFromImage(imageName: string): void {
    if (!imageName) {
      alert('Invalid image name');
      return;
    }

    this.dockerService.createContainer(imageName).subscribe({
      next: () => {
        alert('Container created successfully');
      },
      error: (error) => {
        console.error('Error creating container:', error);
        alert('Error creating container. Check console for details.');
      }
    });
  }

  formatRepoTags(repoTags: string[]): string {
    if (!repoTags || repoTags.length === 0 || repoTags[0] === '<none>:<none>') {
      return 'None';
    }
    return repoTags.join(', ');
  }

  getImageName(image: Image): string {
    if (!image.RepoTags || image.RepoTags.length === 0 || image.RepoTags[0] === '<none>:<none>') {
      return image.Id.substring(7, 19);
    }
    return image.RepoTags[0];
  }

  formatSize(size: number): string {
    if (!size) return 'N/A';
    
    const sizeInMB = size / (1024 * 1024);
    if (sizeInMB < 1000) {
      return `${sizeInMB.toFixed(2)} MB`;
    } else {
      return `${(sizeInMB / 1024).toFixed(2)} GB`;
    }
  }

  formatDate(timestamp: number): string {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  }
}