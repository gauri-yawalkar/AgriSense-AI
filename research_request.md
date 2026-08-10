# Agricultural Research Request: Indian Context

**Context for the AI Assistant:**
We are building an offline Recommendation Engine for a handheld Raspberry Pi device intended for farmers in India (specifically Maharashtra, Punjab, Haryana, and Gujarat). The engine will process ML classification results (crop diseases) and return a structured JSON response with actionable advice.

Please generate a comprehensive JSON file containing agronomic recommendations for the following list of diseases. 

### Data Requirements
For every disease listed below, provide the following structured data:
1. **severity**: "High", "Medium", or "Low"
2. **symptoms**: A brief (1-2 sentence) visual description of the disease.
3. **chemical_treatment**: Specific chemical active ingredients and popular Indian brand names (e.g., *Mancozeb (Dithane M-45)*, *Carbendazim (Bavistin)*, *Propiconazole (Tilt)*).
4. **organic_treatment**: Natural/organic control methods popular in India (e.g., Neem oil, Panchagavya, Trichoderma).
5. **preventative_measures**: Long-term agricultural practices to avoid the disease next season (e.g., crop rotation, spacing, avoiding overhead irrigation).

---

### Target Disease List (JSON Keys must match exactly)

**Corn (Maize):**
* `Corn___Common_Rust`
* `Corn___Gray_Leaf_Spot`
* `Corn___Northern_Leaf_Blight`

**Potato:**
* `Potato___Early_Blight`
* `Potato___Late_Blight`

**Rice:**
* `Rice___Brown_Spot`
* `Rice___Leaf_Blast`
* `Rice___Neck_Blast`

**Sugarcane:**
* `Sugarcane_Bacterial Blight`
* `Sugarcane_Mosaic`
* `Sugarcane_Red Rot`
* `Sugarcane_Rust`
* `Sugarcane_Yellow`

**Wheat:**
* `Wheat___Brown_Rust`
* `Wheat___Yellow_Rust`

**Tomato (Common):**
* `Tomato___Early_Blight`
* `Tomato___Late_Blight`
* `Tomato___Leaf_Mold`
* `Tomato___Septoria_leaf_spot`

---

### Expected JSON Output Format

Please output the research strictly in this JSON structure:

```json
{
  "Potato___Late_Blight": {
    "severity": "High",
    "symptoms": "Large, irregular water-soaked spots on leaves; white fungal growth on the underside.",
    "chemical_treatment": "Prophylactic spray of Mancozeb 75% WP (e.g., Dithane M-45) at 2.5g/L. For severe infection, use Metalaxyl + Mancozeb (e.g., Ridomil Gold).",
    "organic_treatment": "Spray Copper Oxychloride (e.g., Blitox 50) or use Trichoderma viride enriched manure.",
    "preventative_measures": "Ensure field drainage; crop rotation with non-solanaceous crops."
  },
  "Corn___Common_Rust": {
    "severity": "Medium",
    // ...
  }
}
```

Please generate the complete JSON for all the diseases listed above!
