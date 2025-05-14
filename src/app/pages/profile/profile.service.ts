// shared/services/profile.service.ts
import { Injectable } from '@angular/core';
import { Profile } from '../../shared/models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles: Profile[] = [
    {
      id: 'OQyRttOV418',
      user_name: 'John Doe',
      user_url: 'https://unsplash.com/@johndoe?utm_source=unsample',
      photo_url: 'https://unsplash.com/photos/OQyRttOV418?utm_source=unsample',
      email: 'john.doe@example.com',
      avatar: 'J',
    },
    {
      id: '5XP-n_Xqqv8',
      user_name: 'Jane Smith',
      user_url: 'https://unsplash.com/@janesmith?utm_source=unsample',
      photo_url: 'https://unsplash.com/photos/5XP-n_Xqqv8?utm_source=unsample',
      email: 'jane.smith@example.com',
      avatar: 'J',
    },
  ];

  getProfiles(): Profile[] {
    return this.profiles;
  }

  getProfileById(id: string): Profile | undefined {
    return this.profiles.find(profile => profile.id === id);
  }
}