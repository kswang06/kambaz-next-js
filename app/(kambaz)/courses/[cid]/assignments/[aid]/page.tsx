export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-select-assignment-group">
              <option value="EXAM">EXAM</option>
              <option value="QUIZ">QUIZ</option>
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as </label>
          </td>
          <td>
            <select id="wd-select-display-grade">
              <option value="Percentage">Percentage</option>
              <option selected value="Letter">
                Letter
              </option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-select-submission-type">
              <option value="Form">Form</option>
              <option selected value="Online">
                Online
              </option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top"></td>
          <label htmlFor="wd-online-entry-options">Online Entry Options</label>
          <br />
          <input type="checkbox" name="text-entry" id="wd-chkbox-text-entry" />
          <label htmlFor="wd-chkbox-text-entry">Text Entry</label>
          <br />
          <input
            type="checkbox"
            name="website-url"
            id="wd-chkbox-website-url"
          />
          <label htmlFor="wd-chkbox-website-url">Website URL</label>
          <br />
          <input
            type="checkbox"
            name="media-recordings"
            id="wd-chkbox-media-recordings"
          />
          <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label>
          <br />
          <input
            type="checkbox"
            name="student-annotation"
            id="wd-chkbox-student-annotation"
          />
          <label htmlFor="wd-chkbox-student-annotation">
            Student Annotation
          </label>
          <br />
          <input
            type="checkbox"
            name="file-uploads"
            id="wd-chkbox-file-uploads"
          />
          <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
          <br />
        </tr>
        <br />
        <tr>
          <td align="right" valign="top"></td>
          <label htmlFor="wd-assign-to">Assign Assign to</label>
          <br />
          <input id="wd-assign-to" defaultValue={"Everyone"} />
        </tr>
        <br />
        <tr>
          <td align="right" valign="top"></td>
          <label htmlFor="wd-due">Due</label>
          <br />
          <input type="date" defaultValue="2024-05-13" id="wd-due-date" />
        </tr>
        <br />
        <tr>
          <td align="right" valign="top"></td>
          <label htmlFor="wd-available-from">Available from</label>
          <br />
          <input type="date" defaultValue="2024-05-06" id="wd-available-date" />
          <td align="right" valign="top"></td>
          <label htmlFor="wd-until-from">Until</label>
          <br />
          <input type="date" defaultValue="2024-05-20" id="wd-until-date" />
        </tr>
      </table>
    </div>
  );
}
