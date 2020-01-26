export default {
  "Casing#": {
    "subHeading": "Tie to spud date until drilling and completions is added",
    "fields": {
      "DHE_c_comp": {
        "label": "Component",
        "type": "text"
      },
      "DHE_c_count": {
        "label": "Count",
        "type": "text"
      },
      "DHE_c_cl": {
        "label": "Component Length (ft)",
        "type": "text"
      },
      "DHE_c_tl": {
        "label": "Total Length (ft)",
        "type": "text"
      },
      "DHE_c_grade": {
        "label": "Grade",
        "type": "text"
      },
      "DHE_c_dt": {
        "label": "Depth of Top (ft)",
        "type": "text"
      },
      "DHE_c_db": {
        "label": "Depth of Bottom (ft)",
        "type": "text"
      },
      "DHE_c_od": {
        "label": "Outer Diameter (in)",
        "type": "text"
      },
      "DHE_c_id": {
        "label": "Inner Diameter (in)",
        "type": "text"
      },
      "DHE_c_dd": {
        "label": "Drift Diameter (in)",
        "type": "text"
      },
      "DHE_c_weight": {
        "label": "Weight",
        "type": "text"
      }
    }
  },
  "Tubing #": {
    "subHeading": "",
    "fields": {
      "DHE_t_comp": {
        "label": "Component",
        "type": "text"
      },
      "DHE_t_count": {
        "label": "Count",
        "type": "text"
      },
      "DHE_t_cl": {
        "label": "Component Length (ft)",
        "type": "text"
      },
      "DHE_t_tl": {
        "label": "Total Length (ft)",
        "type": "text"
      },
      "DHE_t_grade": {
        "label": "Grade",
        "type": "text"
      },
      "DHE_t_dt": {
        "label": "Depth of Top (ft)",
        "type": "text"
      },
      "DHE_t_db": {
        "label": "Depth of Bottom (ft)",
        "type": "text"
      },
      "DHE_t_od": {
        "label": "Outer Diameter (in)",
        "type": "text"
      },
      "DHE_t_id": {
        "label": "Inner Diameter (in)",
        "type": "text"
      },
      "DHE_t_dd": {
        "label": "Drift Diameter (in)",
        "type": "text"
      },
      "DHE_t_weight": {
        "label": "Weight",
        "type": "text"
      }
    }
  },
  "Rods #": {
    "subHeading": "Used only for progressive cavity pumps (PCP) and insert pumps/positive displacement pumps",
    "fields": {
      "DHE_r_uniqueId": {
        "label": "Unique Well ID",
        "type": "text"
      },
      "DHE_r_jobId": {
        "label": "Job ID or Event ID",
        "type": "text"
      },
      "DHE_r_comp": {
        "label": "Component",
        "type": "text"
      },
      "DHE_r_count": {
        "label": "Count",
        "type": "text"
      },
      "DHE_r_cl": {
        "label": "Component Length (ft)",
        "type": "text"
      },
      "DHE_r_tl": {
        "label": "Total Length (ft)",
        "type": "text"
      },
      "DHE_r_make": {
        "label": "Make",
        "type": "text"
      },
      "DHE_r_grade": {
        "label": "Grade",
        "type": "text"
      },
      "DHE_r_rodia": {
        "label": "Rod Diameter",
        "type": "text"
      },
      "DHE_r_weight": {
        "label": "Weight",
        "type": "text"
      },
      "DHE_r_ct": {
        "label": "Coupling Type",
        "type": "text"
      },
      "DHE_r_cd": {
        "label": "Coupling Diameter",
        "type": "text"
      }
    }
  },
  "Pumps #": {
    "subHeading": "Tied to an artificial lift method",
    "fields": {
      "DHE_pumps": {
        "label": "",
        "type": "radio",
        "options": {
          "pump_radio1": "Jet Pump",
          "pump_radio2": "Rod Insert Pump",
          "pump_radio3": "Gas Lift",
          "pump_radio4": "Electric Submersible Pump (ESP)"
        },
        "suboptions": {
          "type": "checkbox",
          "pump_radio1": {
            "specs_list": "Jet Pump specs list"
          },
          "pump_radio2": {
            "rod_insert": "Rod Insert Pump specs list"
          },
          "pump_radio3": {
            "mandrel_count": "Mandrel Count",
            "mandrel_size": "Mandrel Size",
            "mandrel_ap": "Mandrel actuating pressure",
            "mandrel_depths": "Mandrel depths"
          },
          "pump_radio4": {
            "esp_manufacturer": "Manufacturer",
            "esp_model": "Model",
            "esp_count": "Stage Count",
            "esp_other": "Other Specs"
          }
        }
      },
      "DHE_r_jobId": {
        "label": "Job ID or Event ID",
        "type": "text"
      },
      "DHE_r_comp": {
        "label": "Component",
        "type": "text"
      },
      "DHE_r_count": {
        "label": "Count",
        "type": "text"
      },
      "DHE_r_cl": {
        "label": "Component Length (ft)",
        "type": "text"
      },
      "DHE_r_tl": {
        "label": "Total Length (ft)",
        "type": "text"
      },
      "DHE_r_make": {
        "label": "Make",
        "type": "text"
      },
      "DHE_r_grade": {
        "label": "Grade",
        "type": "text"
      },
      "DHE_r_rodia": {
        "label": "Rod Diameter",
        "type": "text"
      },
      "DHE_r_weight": {
        "label": "Weight",
        "type": "text"
      },
      "DHE_r_ct": {
        "label": "Coupling Type",
        "type": "text"
      },
      "DHE_r_cd": {
        "label": "Coupling Diameter",
        "type": "text"
      }
    }
  },
  "Bottom Hole Assembly #": {
    "subHeading": "",
    "fields": {
      "DHE_BHA": {
        "label": "",
        "type": "radio",
        "options": {
          "BHA_radio1": "Sand Screen",
          "BHA_radio2": "Gas Separator",
          "BHA_radio3": "De-sander"
        },
        "suboptions": {
          "type": "checkbox",
          "BHA_radio1": {
            "ss_manufacturer": "Manufacturer",
            "ss_model": "Model",
            "ss_od": "Outer Diameter",
            "ss_id": "Inner Diameter",
            "ss_other": "Other Specs"
          },
          "BHA_radio2": {
            "gs_manufacturer": "Manufacturer",
            "gs_model": "Model",
            "gs_od": "Outer Diameter",
            "gs_id": "Inner Diameter",
            "gs_dtsize": "Dip Tube Size",
            "gs_dtlength": "Dip Tube Length",
            "gs_other": "Other Specs"
          },
          "BHA_radio3": {
            "ds_manufacturer": "Manufacturer",
            "ds_model": "Model",
            "ds_od": "Outer Diameter",
            "ds_size": "De-sander size",
            "ds_other": "Other Specs"
          }
        }
      }
    }
  }
}
