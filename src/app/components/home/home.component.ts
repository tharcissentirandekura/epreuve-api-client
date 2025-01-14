import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDataHandler('sections').subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.log('Error fetching data', error);
      }
    });
  }
  sendData(): void {
    const payload = {
      grade: '3',
      course: 'Burundi is the best country',
      section: 'Langues',
    };
    this.apiService.postDataHandler(payload, 'sections').subscribe({
      next: (response) => {
        console.log('Data posted successfully', response);
      },
      error: (error) => {
        console.error('Error posting data', error);
      }
    });
  }
}
