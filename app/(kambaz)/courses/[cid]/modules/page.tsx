export default function Modules() {
  return (
    <div>
      <button id="wd-add-button-collapseall">Collapse All</button>{" "}
      <button id="wd-add-button-viewprogress">View Progress</button>{" "}
      <select id="wd-dropdown-publishall">
        <option selected value="PUBLISH_ALL">
          Publish All
        </option>
      </select>{" "}
      <button id="wd-add-button-module">+ Module</button>{" "}
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2
                </li>
              </ul>
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development{" "}
                </li>
                <li className="wd-content-item">
                  Creating an HTTP server with Node.js
                </li>
                <li className="wd-content-item">
                  Creating a React Application{" "}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>{" "}
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create user interfaces with HTML
                </li>
                <li className="wd-content-item">
                  Deploy the assignment to Netlify
                </li>
              </ul>
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to HTML and the DOM{" "}
                </li>
                <li className="wd-content-item">
                  Formatting Web content with Headings
                </li>
                <li className="wd-content-item">
                  Formatting content with Lists and Tables{" "}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>{" "}
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to navigate Github
                </li>
                <li className="wd-content-item">
                  Deploy the assignment on Vercel
                </li>
              </ul>
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Github </li>
                <li className="wd-content-item">
                  How to launch website on Vercel
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
