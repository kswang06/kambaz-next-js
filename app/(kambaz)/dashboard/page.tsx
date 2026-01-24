import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3200" className="wd-dashboard-course-link">
            <Image
              src="/images/database.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3200 Intro to Databases </h5>
              <p className="wd-dashboard-course-title">Database design</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4100" className="wd-dashboard-course-link">
            <Image
              src="/images/AI.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS4100 Artificial Intelligence </h5>
              <p className="wd-dashboard-course-title">AI systems</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3540" className="wd-dashboard-course-link">
            <Image
              src="/images/c++.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3540 Intro to C++ </h5>
              <p className="wd-dashboard-course-title">C++ programming</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image
              src="/images/dsa.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3000 Data Structures & Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Data Structures & Algorithms
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2000" className="wd-dashboard-course-link">
            <Image
              src="/images/calc.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS2000 Calculus for CS </h5>
              <p className="wd-dashboard-course-title">Calc 2</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3500" className="wd-dashboard-course-link">
            <Image
              src="/images/oop.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS3500 Object Oriented Programming</h5>
              <p className="wd-dashboard-course-title">OOP</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4500" className="wd-dashboard-course-link">
            <Image
              src="/images/software.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS4500 Software Development </h5>
              <p className="wd-dashboard-course-title">Software Engineer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1000" className="wd-dashboard-course-link">
            <Image
              src="/images/eco.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1000 Econ in CS Job Market</h5>
              <p className="wd-dashboard-course-title">Job Market in CS</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
