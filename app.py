"""
EMEA Logistics Digital Integration Hub
Proof of Concept for API Governance
Enterprise Solutions Architecture

To run this application:
    streamlit run app.py
"""

import streamlit as st
import pandas as pd
import numpy as np

# Page configuration with Maritime Logistics theme cues
st.set_page_config(
    page_title="EMEA Logistics Digital Integration Hub",
    page_icon="🚢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling for Maritime Enterprise Look
st.markdown("""
<style>
    /* Global corporate branding accent */
    .brand-header {
        background: linear-gradient(135deg, #0B2545 0%, #134074 100%);
        color: #EEF4F8;
        padding: 24px 28px;
        border-radius: 8px;
        margin-bottom: 24px;
        border-left: 6px solid #00A3E0;
    }
    .brand-header h1 {
        color: #FFFFFF !important;
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        padding-bottom: 6px;
    }
    .brand-header p {
        color: #C0D6DF !important;
        font-size: 15px;
        margin: 0;
    }
    .kpi-container {
        background-color: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 16px;
    }
    div[data-testid="stMetricValue"] {
        font-size: 28px;
        font-weight: 700;
        color: #0B2545;
    }
    .action-callout {
        background-color: #FEF3C7;
        border-left: 4px solid #D97706;
        padding: 14px 18px;
        border-radius: 4px;
        color: #92400E;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 14px;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# 1. Embedded Data Generation (Hardcoded mock dataset of 20 trucks)
# ---------------------------------------------------------
@st.cache_data
def load_mock_truck_data() -> pd.DataFrame:
    data = [
        {"Truck_ID": "TRK-101", "Origin_Factory": "Munich", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "Synced", "Delay_Minutes": 15, "CO2_Emissions_Kg": 340.5},
        {"Truck_ID": "TRK-102", "Origin_Factory": "Gothenburg", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "API Error", "Delay_Minutes": 85, "CO2_Emissions_Kg": 512.0},
        {"Truck_ID": "TRK-103", "Origin_Factory": "Lyon", "Destination_Port": "Port of Antwerp", "API_Integration_Status": "Synced", "Delay_Minutes": 0, "CO2_Emissions_Kg": 290.4},
        {"Truck_ID": "TRK-104", "Origin_Factory": "Stuttgart", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "Manual Entry", "Delay_Minutes": 72, "CO2_Emissions_Kg": 380.2},
        {"Truck_ID": "TRK-105", "Origin_Factory": "Wolfsburg", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "Synced", "Delay_Minutes": 25, "CO2_Emissions_Kg": 210.0},
        {"Truck_ID": "TRK-106", "Origin_Factory": "Ghent", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "Synced", "Delay_Minutes": 10, "CO2_Emissions_Kg": 95.8},
        {"Truck_ID": "TRK-107", "Origin_Factory": "Zaragoza", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "API Error", "Delay_Minutes": 110, "CO2_Emissions_Kg": 680.1},
        {"Truck_ID": "TRK-108", "Origin_Factory": "Bratislava", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "Manual Entry", "Delay_Minutes": 65, "CO2_Emissions_Kg": 495.3},
        {"Truck_ID": "TRK-109", "Origin_Factory": "Munich", "Destination_Port": "Port of Rotterdam", "API_Integration_Status": "Synced", "Delay_Minutes": 30, "CO2_Emissions_Kg": 360.7},
        {"Truck_ID": "TRK-110", "Origin_Factory": "Gothenburg", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "Synced", "Delay_Minutes": 40, "CO2_Emissions_Kg": 440.0},
        {"Truck_ID": "TRK-111", "Origin_Factory": "Lyon", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "API Error", "Delay_Minutes": 95, "CO2_Emissions_Kg": 395.2},
        {"Truck_ID": "TRK-112", "Origin_Factory": "Stuttgart", "Destination_Port": "Port of Rotterdam", "API_Integration_Status": "Synced", "Delay_Minutes": 12, "CO2_Emissions_Kg": 315.6},
        {"Truck_ID": "TRK-113", "Origin_Factory": "Wolfsburg", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "Manual Entry", "Delay_Minutes": 45, "CO2_Emissions_Kg": 275.0},
        {"Truck_ID": "TRK-114", "Origin_Factory": "Ghent", "Destination_Port": "Port of Antwerp", "API_Integration_Status": "Synced", "Delay_Minutes": 5, "CO2_Emissions_Kg": 82.4},
        {"Truck_ID": "TRK-115", "Origin_Factory": "Zaragoza", "Destination_Port": "Port of Rotterdam", "API_Integration_Status": "API Error", "Delay_Minutes": 78, "CO2_Emissions_Kg": 650.0},
        {"Truck_ID": "TRK-116", "Origin_Factory": "Bratislava", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "Synced", "Delay_Minutes": 35, "CO2_Emissions_Kg": 510.8},
        {"Truck_ID": "TRK-117", "Origin_Factory": "Munich", "Destination_Port": "Port of Zeebrugge", "API_Integration_Status": "Synced", "Delay_Minutes": 18, "CO2_Emissions_Kg": 355.0},
        {"Truck_ID": "TRK-118", "Origin_Factory": "Gothenburg", "Destination_Port": "Port of Antwerp", "API_Integration_Status": "Manual Entry", "Delay_Minutes": 90, "CO2_Emissions_Kg": 530.4},
        {"Truck_ID": "TRK-119", "Origin_Factory": "Lyon", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "Synced", "Delay_Minutes": 50, "CO2_Emissions_Kg": 460.2},
        {"Truck_ID": "TRK-120", "Origin_Factory": "Stuttgart", "Destination_Port": "Port of Bremerhaven", "API_Integration_Status": "API Error", "Delay_Minutes": 105, "CO2_Emissions_Kg": 390.1},
    ]
    return pd.DataFrame(data)

df = load_mock_truck_data()

# ---------------------------------------------------------
# Sidebar: Solutions Architecture Context
# ---------------------------------------------------------
with st.sidebar:
    st.markdown("### 🚢 Global RoRo Logistics")
    st.markdown("**Enterprise Architecture & Integration**")
    st.markdown("---")
    st.markdown("""
    **Solutions Architect Note:**
    This dashboard represents the target integration pattern for RoRo carrier logistics across European corridors. 
    By unifying carrier telematics and factory dispatch into **Azure API Management**, we eliminate legacy CSV/EDI drop-offs and prevent vessel loading bottlenecks at RoRo port hubs.
    """)
    st.markdown("---")
    filter_port = st.multiselect(
        "Filter by Destination Port",
        options=sorted(df["Destination_Port"].unique()),
        default=sorted(df["Destination_Port"].unique())
    )
    st.caption("EMEA Fleet Operations · Telematics v2.4")

# Filtered view for dashboard if user adjusts sidebar
filtered_df = df[df["Destination_Port"].isin(filter_port)]

# ---------------------------------------------------------
# Header & Subheader
# ---------------------------------------------------------
st.markdown("""
<div class="brand-header">
    <h1>EMEA Logistics Digital Integration Hub</h1>
    <p>Proof of Concept for API Governance · Fleet Visibility & Telematics Gateway</p>
</div>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# KPI Cards: Display 3 metrics at the top using st.columns
# ---------------------------------------------------------
col1, col2, col3 = st.columns(3)

total_trucks = len(df)
synced_trucks = (df["API_Integration_Status"] == "Synced").sum()
api_success_rate = (synced_trucks / total_trucks) * 100 if total_trucks > 0 else 0
critical_delays = (df["Delay_Minutes"] > 60).sum()

with col1:
    st.metric(
        label="Total Trucks in Transit",
        value=f"{total_trucks} Units",
        help="Total monitored fleet vehicles dispatched from European OEM manufacturing facilities."
    )

with col2:
    st.metric(
        label="API Success Rate",
        value=f"{api_success_rate:.1f}%",
        delta=f"{synced_trucks}/{total_trucks} Synced",
        help="Percentage of trucks currently delivering telemetry via automated REST/Azure API Management."
    )

with col3:
    st.metric(
        label="Critical Delays (>60 min)",
        value=f"{critical_delays} Trucks",
        delta="-High Risk" if critical_delays > 0 else "Nominal",
        delta_color="inverse",
        help="Vehicles with transit delays exceeding 60 minutes, risking vessel cut-off windows."
    )

st.markdown("---")

# ---------------------------------------------------------
# Visuals: Bar chart of average Delay_Minutes grouped by Destination_Port
# ---------------------------------------------------------
st.subheader("Transit Performance by Destination RoRo Port")
st.markdown("Average inland carrier delay (minutes) across European receiving terminals.")

# Group by Destination_Port and compute mean Delay_Minutes
avg_delay_by_port = (
    filtered_df.groupby("Destination_Port")["Delay_Minutes"]
    .mean()
    .round(1)
    .reset_index()
    .rename(columns={"Delay_Minutes": "Average Delay (Minutes)"})
)

# Streamlit native bar chart
st.bar_chart(
    data=avg_delay_by_port.set_index("Destination_Port"),
    use_container_width=True,
    color="#0B2545"
)

st.markdown("---")

# ---------------------------------------------------------
# Actionable Data: Interactive table showing ONLY "API Error" or "Manual Entry"
# ---------------------------------------------------------
st.subheader("Disrupted Telemetry & Manual Silo Exceptions")

# Required callout text
st.warning(
    "Action Required: The following units require manual follow-up due to legacy system silos. "
    "Migrating these to the new Azure API Management layer will automate this workflow."
)

# Filter ONLY trucks where API_Integration_Status is "API Error" or "Manual Entry"
actionable_trucks = df[df["API_Integration_Status"].isin(["API Error", "Manual Entry"])].copy()

# Sort by Delay_Minutes descending to highlight urgent disruptions
actionable_trucks = actionable_trucks.sort_values(by="Delay_Minutes", ascending=False)

# Display interactive dataframe
st.dataframe(
    actionable_trucks,
    use_container_width=True,
    column_config={
        "Truck_ID": st.column_config.TextColumn("Truck Identifier", help="Unique vehicle telematics ID"),
        "Origin_Factory": st.column_config.TextColumn("Origin Plant"),
        "Destination_Port": st.column_config.TextColumn("Destination RoRo Terminal"),
        "API_Integration_Status": st.column_config.TextColumn(
            "Integration Status",
            help="Status in legacy pipeline"
        ),
        "Delay_Minutes": st.column_config.ProgressColumn(
            "Transit Delay (min)",
            help="Delay in minutes relative to scheduled gate-in",
            format="%d min",
            min_value=0,
            max_value=120
        ),
        "CO2_Emissions_Kg": st.column_config.NumberColumn(
            "Est. CO₂ (Kg)",
            format="%.1f kg"
        ),
    },
    hide_index=True
)

# ---------------------------------------------------------
# Full Fleet Reference (Collapsible for comprehensive auditing)
# ---------------------------------------------------------
with st.expander("🔍 View Complete EMEA Fleet Dataset (20 Monitored Units)"):
    st.dataframe(df, use_container_width=True, hide_index=True)

st.caption("Global RoRo Logistics EMEA Digital Logistics Hub · Solutions Architecture PoC · Azure API Management Migration Track")
