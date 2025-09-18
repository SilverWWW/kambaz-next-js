import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="React JS Course"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1235" className="wd-dashboard-course-link">
            <Image
              src="/images/art.jpeg"
              width={200}
              height={150}
              alt="Digital Art Course"
            />
            <div>
              <h5> ART1235 Digital Art </h5>
              <p className="wd-dashboard-course-title">
                Creative digital art and design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1236" className="wd-dashboard-course-link">
            <Image
              src="/images/french.jpeg"
              width={200}
              height={150}
              alt="French Language Course"
            />
            <div>
              <h5> FR1236 French Language </h5>
              <p className="wd-dashboard-course-title">
                Learn French language and culture
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1237" className="wd-dashboard-course-link">
            <Image
              src="/images/history.jpg"
              width={200}
              height={150}
              alt="World History Course"
            />
            <div>
              <h5> HIST1237 World History </h5>
              <p className="wd-dashboard-course-title">
                Explore world history and civilizations
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1238" className="wd-dashboard-course-link">
            <Image
              src="/images/math.jpeg"
              width={200}
              height={150}
              alt="Calculus Course"
            />
            <div>
              <h5> MATH1238 Calculus </h5>
              <p className="wd-dashboard-course-title">
                Advanced calculus and mathematical analysis
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1239" className="wd-dashboard-course-link">
            <Image
              src="/images/music.jpg"
              width={200}
              height={150}
              alt="Music Theory Course"
            />
            <div>
              <h5> MUS1239 Music Theory </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of music theory and composition
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1240" className="wd-dashboard-course-link">
            <Image
              src="/images/science.jpg"
              width={200}
              height={150}
              alt="Physics Course"
            />
            <div>
              <h5> SCI1240 Physics </h5>
              <p className="wd-dashboard-course-title">
                Introduction to physics and scientific principles
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1241" className="wd-dashboard-course-link">
            <Image
              src="/images/teslabot.jpg"
              width={200}
              height={150}
              alt="Robotics Course"
            />
            <div>
              <h5> AI1241 Robotics </h5>
              <p className="wd-dashboard-course-title">
                Introduction to robotics and artificial intelligence
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
