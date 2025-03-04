import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: false,
})
export class SummaryComponent implements OnInit {
  userData: User | null = null;
  total: number | null = null;
  showAnimation: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
  
    if (navigation?.extras.state) {
      this.userData = navigation.extras.state['userData'] ?? null;
      this.total = navigation.extras.state['total'] ?? null;
  
      setTimeout(() => {
        this.showAnimation = true;
      }, 300);
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}