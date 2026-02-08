import { Row, Col, Table } from "react-bootstrap";

export default function BootstrapGrids() {
  return (
    <>
      <h2>Bootstrap</h2>
      <div id="wd-bs-grid-system">
        <h2>Grid system</h2>
        <Row>
          <Col className="bg-danger text-white">
            {" "}
            <h3>Left half</h3>{" "}
          </Col>
          <Col className="bg-primary text-white">
            {" "}
            <h3>Right half</h3>{" "}
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="bg-warning">
            {" "}
            <h3>One third</h3>{" "}
          </Col>
          <Col xs={8} className="bg-success text-white">
            {" "}
            <h3>Two thirds</h3>{" "}
          </Col>
        </Row>
        <Row>
          <Col xs={2} className="bg-black text-white">
            {" "}
            <h3>Sidebar</h3>{" "}
          </Col>
          <Col xs={8} className="bg-secondary text-white">
            {" "}
            <h3>Main content</h3>{" "}
          </Col>
          <Col xs={2} className="bg-info">
            {" "}
            <h3>Sidebar</h3>{" "}
          </Col>
        </Row>
      </div>
      <div id="wd-bs-responsive-grids">
        <h2>Responsive grid system</h2>
        <Row>
          <Col xs={12} md={6} xl={3} className="bg-warning">
            <h3>Column A</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-primary text-white">
            <h3>Column B</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-danger text-white">
            <h3>Column C</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-success text-white">
            <h3>Column D</h3>
          </Col>
        </Row>
      </div>
      <div id="wd-bs-responsive-dramatic">
        <h2>Responsive grid system</h2>
        <Row>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-warning"
          >
            <h4>1</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-primary text-white"
          >
            <h4>2</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-danger text-white"
          >
            <h4>3</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-success text-white"
          >
            <h4>4</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-warning"
          >
            <h4>5</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-primary text-white"
          >
            <h4>6</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-danger text-white"
          >
            <h4>7</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-success text-white"
          >
            <h4>8</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-warning"
          >
            <h4>9</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-primary text-white"
          >
            <h4>10</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-danger text-white"
          >
            <h4>11</h4>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            className="bg-success text-white"
          >
            <h4>12</h4>
          </Col>
        </Row>
      </div>
      <div id="wd-css-styling-tables">
        <h2>Tables</h2>
        <Table>
          <thead>
            <tr className="table-dark">
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-warning">
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr className="table-danger">
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr className="table-primary">
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>90</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="table-success">
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <div id="wd-css-responsive-tables">
        <h2>Responsive tables</h2>
        <Table responsive>
          <thead>
            <tr>
              <th>Very</th>
              <th>long</th>
              <th>set</th>
              <th>of</th>
              <th>columns</th>
              <th>Very</th>
              <th>long</th>
              <th>set</th>
              <th>of</th>
              <th>columns</th>
              <th>Very</th>
              <th>long</th>
              <th>set</th>
              <th>of</th>
              <th>columns</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Very</td>
              <td>long</td>
              <td>set</td>
              <td>of</td>
              <td>columns</td>
              <td>Very</td>
              <td>long</td>
              <td>set</td>
              <td>of</td>
              <td>columns</td>
              <td>Very</td>
              <td>long</td>
              <td>set</td>
              <td>of</td>
              <td>columns</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
