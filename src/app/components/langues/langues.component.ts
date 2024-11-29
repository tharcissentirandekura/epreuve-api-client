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
  selector: 'app-langues',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './langues.component.html',
  styleUrl: './langues.component.scss'
})


export class LanguesComponent implements OnInit {
  languesTests: any[] = [];
  filteredTests: any[] = [];
  searchTerm: string = '';
  selectedYear: string = '';
  selectedCourse: string = '';
  uniqueYears: string[] = [];
  uniqueCourses: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const endpoint = 'tests';
    this.apiService.getDataHandler(endpoint).subscribe({
      next: (response: any[]) => {
        this.languesTests = response.filter(test => 
          test.section === 'Langues' || 
          test.section === 'Linguistique' ||
          test.section.includes('Lang')
        );
        this.filteredTests = [...this.languesTests];
        
        // Extract unique years and courses for filters
        this.uniqueYears = [...new Set(this.languesTests.map(test => 
          new Date(test.year).getFullYear().toString()
        ))].sort().reverse();
        
        this.uniqueCourses = [...new Set(this.languesTests.map(test => 
          test.course
        ))].sort();
      },
      error: (error) => {
        console.error('Error fetching tests:', error);
      }
    });
  }

  applyFilters() {
    let filtered = [...this.languesTests];
    
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
    this.filteredTests = [...this.languesTests];
  }
}


