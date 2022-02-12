// Function that apply the change on dropdown menu
function optionChanged(selectedID){

    console.log(selectedID);
 
    // Read the json file 
    d3.json("samples.json").then((data) => {
 
   //  console.log(data);
    
    d3.select("#selDataset").html("");   
    
    // Select the metadata array and for each item append the item ID and adds ID to dropdown
    data.metadata.forEach(item =>
         {
    // console.log(item.id);
         d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
    
    d3.select("#selDataset").node().value = selectedID;
    
    // Filter Metadata for ID 
    const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
       
    console.log(idMetadata);

    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });
 

    //     BAR CHART DISPLAY 

    // Filter sample data for selected ID
    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
       
    // Slice top 10 sample values
    var sampleValue = idSample[0].sample_values.slice(0,10);
    sampleValue= sampleValue.reverse();
    var otuID = idSample[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    var otuLabels = idSample[0].otu_labels
    otuLabels = otuLabels.reverse();
 
     
    // bar chart (y axis)
    const yAxis = otuID.map(item => 'OTU' + " " + item);
       // console.log(yAxis);
    
       const trace = {
       y: yAxis,
       x: sampleValue,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: 'rgb(154, 140, 152)',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top 10 OTUs for a specific individual',
       xaxis: {title: 'Number of Samples Collected'},
       yaxis: {title: 'OTU ID'}
       };
 
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    

       
 //   BUBBLE CHART DISPLAY 
 
 // Remove Sample value and otuID 
 var sampleValue1 =idSample[0].sample_values;
 var otuID1= idSample[0].otu_ids;
 
 const trace1 = {
    x: otuID1,
    y: sampleValue1,
    mode: 'markers',
    marker: {
      color: otuID1,
      
      size: sampleValue1
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples Collected'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 Plotly.newPlot('bubble', [trace1], layout1);

});
}

// Initial test starts at ID 940
optionChanged(940);
 
// Event on change takes the value and calls the function during dropdown selection
d3.select("#selDataset").on('change',() => {
optionChanged(d3.event.target.value);

});