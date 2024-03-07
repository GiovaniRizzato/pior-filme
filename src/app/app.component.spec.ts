import { render, RenderResult } from '@testing-library/angular'
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


describe('MovieListComponent', () => {
  let component: RenderResult<AppComponent, AppComponent>;

  beforeEach(async () => {
    component = await render(AppComponent, {
      imports: [
        AppModule
      ],
    })
  })

  
  it('should be created', () => { 
    expect(component).toBeTruthy();
  });
});