import { render, RenderResult } from '@testing-library/angular'
import { AppModule } from '../app.module';
import { SidebarComponent } from './sidebar.component';


describe('MovieListComponent', () => {
  let component: RenderResult<SidebarComponent, SidebarComponent>;

  beforeEach(async () => {
    component = await render(SidebarComponent, {
      imports: [
        AppModule
      ],
    })
  })

  
  it('should be created', () => { 
    expect(component).toBeTruthy();
  });
});