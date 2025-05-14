import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from '../../shared/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [],
})
export class ProfileComponent implements OnInit {
  profiles: Profile[] = [];
  selectedIndex: number = 0;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profiles = this.profileService.getProfiles();
    this.selectedIndex = 0;
  }

    reload(index: number): void {
      this.selectedIndex = index;
    }
  }