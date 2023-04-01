const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(data => console.log(data));

function init() {

  var dropdown = d3.select('#selDataset');
  d3.json(url).then((data)=> {
    var all_samples = data.names
    all_samples.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });
      var first_sample = all_samples[0];
      buildChart(first_sample);
      metdata(first_sample);
    });
    }
    init();

function metdata(option) {
  d3.json(url).then((data) => {
  let metadata = data.metadata; 
  let meta = metadata.filter(obj => obj.id == option);
  console.log(meta);
  let metaone = meta[0];
  console.log(metaone);
  let panel = d3.select('#sample-metadata').html('');
  for (sample in metaone) {
      panel.append('h4').text(`${sample.toUpperCase()}: ${metaone[sample]}`);
    };
  })};

function buildChart(sample) {
  d3.json("samples.json").then((data) => {
    console.log(data);
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var otu_labels = result.otu_labels;
    var ten_otu_labels = otu_labels.slice(1, 11)
    var sample_values = result.sample_values;
    var ten_sample_values = sample_values.slice(1, 11)
    var otu_ids = result.otu_ids;
    var ten_otu_ids = otu_ids.slice(1, 11).map(otuID => `OTU ${otuID}`);
    ten_otu_ids.reverse();
    ten_sample_values.reverse();
    ten_otu_labels.reverse();
    var barData = [
      {
        x: ten_sample_values,
        y: ten_otu_ids,
        type: 'bar',
        orientation: 'h',
        text: ten_otu_labels,
      }
    ];
    Plotly.newPlot("bar", barData, optionChanged);

    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          color: otu_ids,
          colorscale: 'Earth',
          size: sample_values
        }
      }
    ]; 
      var layout = {
        title: 'Display for each item',
        showlegend: false,
      };
      
      Plotly.newPlot('bubble', bubbleData, layout);

  
  }
  
)};

function optionChanged(value) {
  buildChart(value);
  metdata(value);
  };
    /**var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
      }
      
      var layout = {
        title: 'Display for each item',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('myDiv', bubbleData, layout);

    ]
  }
)};

function optionChanged(value) {
  buildChart(value);
  metdata(value);
  };
 
/**d3.json('./static/data/samples.json').then(({names})=> {
  names.forEach(name => {
    d3.select('select').append('option').text(name)
  });

  optionChanged();
});

const optionChanged = () => {
  let option = d3.select('select').node().value;
  console.log(option);

  d3.json('./static/data/samples.json').then(({metadata, samples})=> {
    let meta = metadata.filter(obj => obj.id == option)[0];
    let sample = samples.filter(obj => obj.id == option)[0];

    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val]) => {
      d3.select('.panel-body').append('h4').text(`${key.toLocaleUpperCase()}: ${val}`)
    })
  });

  d3.json('./static/data/samples.json').then(({samples})=> {
  
    var data = [
    {
      x: ['sample_values'],
      y: ['otu_ids'],
      type: 'bar'
    }
  ]});
  
  Plotly.newPlot('myDiv', data);
}*/