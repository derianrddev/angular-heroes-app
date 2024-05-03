import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html'
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
