import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public newMemberName: string = '';
  public members: string[] = [];
  public errorMessage: string = '';
  public numOfTeams: number | '' = '';
  public teams: string[][] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  public onNameInput(member: string) {
    this.newMemberName = member;
  }

  public addMember() {

    if (!this.newMemberName) {
      this.errorMessage = 'Member name cannot be empty';
      return;
    }

    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  public generateTeams() {
    if (!this.numOfTeams || this.numOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams';
      return;
    }

    if (this.members.length < this.numOfTeams) {
      this.errorMessage = 'Invalid number of teams';
      return;
    }

    this.errorMessage = '';

    const allMembers = [...this.members];

    while (allMembers.length) {

      for (let i = 0; i < this.numOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numOfTeams = '';
  }

  onNumOfTeamsInput(value: string) {
    this.numOfTeams = Number(value);
  }
}
