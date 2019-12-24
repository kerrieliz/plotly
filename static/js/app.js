// 1. Use the D3 library to read in samples.json.

function buildMetadata(sample) {

  d3.json('samples.json').then(function(dataPassback){
    var sampleData = d3.select('#sample-metadata');

    sampleData.html("");

    var dataPassback = dataPassback.metadata;

    var filteredData = dataPassback.filter(sampleObject => sampleObject.id === sample);
    
    Object.entries(filteredData).forEach(function([key,value]){
      var row = sampleData.append("p");
      row.text(`${key}:${value}`)
    })
  });
}

// function to initialize 

function initData(){
    var input = d3.select('#selDataset')
    d3.json('samples.json').then(function(dataReturn){
        var names = dataReturn.names
        names.forEach(function(sample){
            input.append("option").text(sample).property("value",sample);
        })
        var firstSample = names[0]
        buildMetadata(firstSample)
        buildCharts(firstSample)
    })
}
function optionChanged(newSample) {  
  buildCharts(newSample);  
  buildMetadata(newSample);
}

initData();

// 2. Create a horizontal bar chart with a dropdown menu to 
// display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

function buildCharts(sample) {
  d3.json('samples.json').then(function(data){

    // Grab values from the data json object to build the plots
    var data = data.samples;

    var filteredData = data.filter(sampleObject => sampleObject.id === sample);
    
    var Value = filteredData[0].sample_values.slice(0,10);
    var OTU = filteredData[0].otu_ids.slice(0,10);
    var Label = filteredData[0].otu_labels.slice(0,10);
    
    var trace1 = {
      x: Value,
      y: OTU,
      text: Label,
      orientation: 'h',
      marker: {
        color: '#17BECF',
        width: 1
      },
      type: 'bar'
    };

    var data = [trace1];

    var layout = {
      title: 'Top 10 OTUs'
    }

    Plotly.newPlot("chart", data, layout);
};

buildCharts();

// 3. Create a bubble chart that displays each sample.

// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.


// 4. Display the sample metadata, 
// i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.
// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

// Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment and your GitHub repo.

// Hints
// Use console.log inside of your JavaScript code to see what your data looks like at each step.
// Refer to the Plotly.js documentation when building the plots.