export default {
  "NO_HEADING": {
    "subheading": "",
    "fields": {
      "job_well_id": {
        "label": "Unique Well ID",
        "type": "text"
      },
      "job_id": {
        "label": "Unique Job ID",
        "type": "text"
      },
      "job_shut_date": {
        "label": "Well Shut-In Date",
        "type": "date"
      },
      "job_startdate": {
        "label": "Job Start Date",
        "type": "date"
      },
      "job_enddate": {
        "label": "Job End Date",
        "type": "date"
      },
      "job_failcomp": {
        "label": "Failure Component",
        "type": "text"
      },
      "job_failmech": {
        "label": "Failure Mechanism",
        "type": "text"
      },
      "job_summary": {
        "label": "Job Summary",
        "type": "text"
      },
      "job_timelog": {
        "label": "Job Time Log",
        "type": "text"
      },
      "job_AFE": {
        "label": "AFE Estimate by accounting code",
        "type": "text"
      },
      "job_FE": {
        "label": "Field Estimate by accounting code",
        "type": "text"
      },
      "job_actual_cost": {
        "label": "Actual Cost by accounting code",
        "type": "text"
      },
      "job_BHA": {
        "label": "",
        "type": "radio",
        "options": {
          "BHAin": "Bottom Hole Assembly (BHA) in",
          "BHAout": "Bottom Hole Assembly (BHA) out"
        },
        "subOptions": {
          "BHAout": {
            "preBHA": "should be previous BHA in"
          }
        }
      }
    }
  }
}
