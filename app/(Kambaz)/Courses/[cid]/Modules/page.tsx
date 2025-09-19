export default function Modules() {
  return (
    <div>
      <div id="wd-modules-controls">
        <button id="wd-collapse-all-btn">Collapse All</button>
        <button id="wd-view-progress-btn">View Progress</button>
        <select id="wd-publish-all-dropdown">
          <option value="">Publish All</option>
        </select>
        <button id="wd-add-module-btn">+ Module</button>
      </div>
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
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">HTML Fundamentals</li>
                <li className="wd-content-item">CSS Styling and Layout</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">JavaScript Basics</li>
                <li className="wd-content-item">DOM Manipulation</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 4</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">React Components</li>
                <li className="wd-content-item">State and Props</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 5</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">React Hooks</li>
                <li className="wd-content-item">API Integration</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
