export default {
  "NO_HEADING": {
    "subheading": "",
    "fields": {
      "eve_well_id": {
        "label": "Unique Well ID",
        "type": "text"
      },
      "eve_id": {
        "label": "Event ID",
        "type": "text"
      },
      "eve_date": {
        "label": "Event Date",
        "type": "date"
      },
      "eve_status": {
        "label": "Event Status",
        "type": "text"
      },
      "eve_shut": {
        "label": "Shut-In",
        "type": "text"
      },
      "eve_flowing": {
        "label": "Flowing",
        "type": "text"
      },
      "artificial_lift": {
        "label": "On Artificial Lift",
        "type": "checkbox",
        "options": {
          "rodpump": "Rod Pump",
          "elec_sub": "Electric Submersible Pump",
          "pcp": "Progressive Cavity Pump",
          "gaslift": "Gas Lift",
          "jet": "Jet Pump",
          "plunger": "Plunger Lift",
          "pagl": "Plunger Assisted Gas"
        }
      }
    }
  }
}
