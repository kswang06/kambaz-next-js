import Link from "next/link";
export default function labs() {
  return (
    <div id="wd-labs">
      <h4>Name: Kevin Wang</h4>
      <h4>Section: 02</h4>
      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab 4: Client/Server Components{" "}
          </Link>
        </li>

        <li>
          <Link href="/labs/lab5" id="wd-lab5-link">
            Lab 5:{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
}
