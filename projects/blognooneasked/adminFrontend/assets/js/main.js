// API imports
import "./api/auth.js";

// DOM imports
const page = document.body.dataset.page;

switch (page) {
  case "login":
    import("./ui/login.js");
    break;

  case "dashboard":
    import("./ui/logout.js");
    import("./ui/dasboard/init.js");
    break;

  case "post":
    import("./ui/logout.js");
    import("./ui/post/init.js");
    break;

  default:
    console.warn(`No scripts found for page: ${page}`);
}
