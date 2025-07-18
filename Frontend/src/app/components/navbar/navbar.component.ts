import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { MenuTrackerService } from "../sidebar/services/menu-tracker.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  @Output() smartviewToggled = new EventEmitter<boolean>();
  isSmartviewOn: boolean = false;
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  @Input() menuItems: any;
  searchForm: FormGroup;
  searchResults: any[] = [];
  searchError: string = "";
  //Search functionality properties
  searchQuery: string = "";
  // searchResults: any[] = [];
  showSearchDropdown: boolean = false;
  isSearching: boolean = false;
  searchSubject = new Subject<string>();
  API_BASE = "http://10.0.7.93:5000";
  showSearchResults: boolean = false;
  searchResponseData: any = null;
  isLoadingSearch: boolean = false;
  selectedIndex: number = -1;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private MenuTrackerService: MenuTrackerService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [""],
    });
    console.log("ONINIT>>>>", this.menuItems);
    this.listTitles = this.menuItems.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }
    console.log(this.menuItems);
    for (var item = 0; item < this.menuItems.length; item++) {
      if (this.menuItems[item].path === titlee) {
        return this.menuItems[item].title;
      }
    }
    return "Dashboard";
  }

  toggleSmartview() {
    this.isSmartviewOn = !this.isSmartviewOn;
    this.smartviewToggled.emit(this.isSmartviewOn);
    // Optional: emit to parent, store in service, or call API
    console.log("Smartview is now:", this.isSmartviewOn);
  }

  selectSearchResult(result: any) {
    this.searchQuery = result.content || result.text || "";
    this.showSearchDropdown = false;
    this.selectedIndex = -1;
    this.processQuery(this.searchQuery);
  }

  async processQuery(query: string) {
    if (this.isLoadingSearch) return;

    this.isLoadingSearch = true;
    this.showSearchDropdown = false;
    this.showSearchResults = true;

    try {
      const response = await this.http
        .post(`${this.API_BASE}/api/qa/process`, {
          query: query,
        })
        .toPromise();

      this.searchResponseData = response;
    } catch (error) {
      console.error("Error processing query:", error);
      this.searchResponseData = {
        error: "Network error occurred. Please try again.",
      };
    } finally {
      this.isLoadingSearch = false;
    }
  }

  onSearchFocus() {
    if (this.searchQuery.length >= 3 && this.searchResults.length > 0) {
      this.showSearchDropdown = true;
    }
  }
  onSearchBlur() {
    // Delay hiding to allow clicking on dropdown items
    setTimeout(() => {
      this.showSearchDropdown = false;
      this.selectedIndex = -1;
    }, 200);
  }
  onSearchKeyDown(event: KeyboardEvent) {
    if (!this.showSearchDropdown || this.searchResults.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.selectedIndex = Math.min(
          this.selectedIndex + 1,
          this.searchResults.length - 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case "Enter":
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectSearchResult(this.searchResults[this.selectedIndex]);
        } else {
          this.onSearchSubmit(event);
        }
        break;
      case "Escape":
        this.showSearchDropdown = false;
        this.selectedIndex = -1;
        break;
    }
  }

  onSearchSubmit(value: any) {
    //   const query = this.searchForm.value.query.trim();
    const query = value;

    if (!query) return;

    this.MenuTrackerService.searchQuery(query).subscribe({
      next: (data:any) => {
        this.searchResults = data?.results;
        console.log(":::::::::::::::::this.searchResults:::::::::::::::",this.searchResults)
        this.searchError = "";
      },
      error: (err) => {
        console.error("Search API error:", err);
        this.searchResults = [];
        this.searchError = "Error fetching search results";
      },
    });
  }

  redirectToRoute(path: string): void {
    console.log("Redirection PATH>>>>>>>>",path)
  if (path) {
    this.router.navigateByUrl(path);
  }
}
}
