import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  images: string[] = [
    'assets/image1.png',
    'assets/image2.png',
    'assets/image3.png',
    'assets/image4.png',
    'assets/image5.png',
    'assets/image6.png',
    // Add more image paths as needed
  ];
  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  goToSlide(index: number): void {
    clearInterval(this.intervalId);
    this.currentIndex = index;
    this.startCarousel();
  }

  prevSlide(): void {
    clearInterval(this.intervalId);
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.startCarousel();
  }

  nextSlide(): void {
    clearInterval(this.intervalId);
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.startCarousel();
  }
}
