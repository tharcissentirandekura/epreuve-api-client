import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Test {
  id: number;
  test: string;
  link: string;
  course: string;
  section: string;
  year: string;
}

@Component({
  selector: 'app-mathphys',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, DatePipe, FormsModule],
  templateUrl: './mathphys.component.html',
  styleUrl: './mathphys.component.scss'
})

export class MathphysComponent implements OnInit {
  mathPhysTests: Test[] = [];
  filteredTests: Test[] = [];
  searchTerm: string = '';
  selectedYear: string = '';
  selectedCourse: string = '';
  uniqueYears: string[] = [];
  uniqueCourses: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const endpoint = 'tests';
    this.apiService.getDataHandler(endpoint).subscribe({
      next: (response: Test[]) => {
        this.mathPhysTests = response.filter(test => 
          test.section === 'Math & Physique' || 
          test.section === 'Mathématiques & Physique' || 
          test.section.includes('Math') || 
          test.section.includes('Physique')
        );
        this.filteredTests = [...this.mathPhysTests];
        
        // Extract unique years and courses for filters
        this.uniqueYears = [...new Set(this.mathPhysTests.map(test => 
          new Date(test.year).getFullYear().toString()
        ))].sort().reverse();
        
        this.uniqueCourses = [...new Set(this.mathPhysTests.map(test => 
          test.course
        ))].sort();
      },
      error: (error) => {
        console.error('Error fetching tests:', error);
      }
    });
  }

  applyFilters() {
    let filtered = [...this.mathPhysTests];
    
    // Apply search term filter
    if (this.searchTerm.trim()) {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(test => 
        test.test.toLowerCase().includes(searchTermLower) || 
        test.course.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Apply year filter
    if (this.selectedYear) {
      filtered = filtered.filter(test => 
        new Date(test.year).getFullYear().toString() === this.selectedYear
      );
    }
    
    // Apply course filter
    if (this.selectedCourse) {
      filtered = filtered.filter(test => 
        test.course === this.selectedCourse
      );
    }
    
    this.filteredTests = filtered;
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedYear = '';
    this.selectedCourse = '';
    this.filteredTests = [...this.mathPhysTests];
  }
}
