import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { FooterComponent } from '../../reusable/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
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
  selector: 'app-concours',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './concours.component.html',
  styleUrl: './concours.component.scss'
})
export class ConcoursComponent implements OnInit {
  languesTests: Test[] = [];
  filteredTests: Test[] = [];
  searchTerm: string = '';
  selectedYear: string = '';
  selectedCourse: string = '';
  uniqueYears: string[] = [];
  uniqueCourses: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTestByCategory('tests', '9è').subscribe({
      next: (tests: Test[]) => {
        this.languesTests = tests;
        this.filteredTests = [...this.languesTests];
        
        // Extract unique years and courses for filters
        this.uniqueYears = [...new Set(this.languesTests.map(test => 
          new Date(test.year).getFullYear().toString()
        ))].sort().reverse();
        
        this.uniqueCourses = [...new Set(this.languesTests.map(test => 
          test.course
        ))].sort();
      },
      error: (error) => console.error('Error fetching tests:', error)
    });
  }

  applyFilters() {
    let filtered = [...this.languesTests];
    
    if (this.searchTerm.trim()) {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(test => 
        test.test.toLowerCase().includes(searchTermLower) || 
        test.course.toLowerCase().includes(searchTermLower)
      );
    }
    
    if (this.selectedYear) {
      filtered = filtered.filter(test => 
        new Date(test.year).getFullYear().toString() === this.selectedYear
      );
    }
    
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
    this.filteredTests = [...this.languesTests];
  }
}


