angular.module('stanleygu.cytoscapeweb', [])
.directive('cytoscape', function() {
  return {
    template: '<div></div>',
    restrict: 'E',
    replace: true,
    scope: {
      graph: '='
    },
    link: function postLink(scope, element, attrs) {

      var id;
      if (attrs.id) {
        id = attrs.id;
      } else {
        id = parseInt(Math.random() * 1e10, 10);
        element[0].setAttribute('id', id);
      }

      // setting the visibility of panZoomControlVisible if present in directive
      var panZoomControlVisible;
      if (attrs.panzoomcontrolvisible) {
        if(attrs.panzoomcontrolvisible.match(/false/i)) {
          panZoomControlVisible = false;
        } else {
          panZoomControlVisible = true;
        }
      } else {
        panZoomControlVisible = true;
      }

      var shapeMapper = {
        attrName: "node set",
        entries: [{
          attrValue: "species",
          value: "ELLIPSE"
        }, {
          attrValue: "reaction",
          value: "DIAMOND"
        }
        ]
      };

      var visual_style = {
        global: {
          backgroundColor: "#ffffff"
        },
        nodes: {
          shape: {
            defaultValue: "ELLIPSE",
            discreteMapper: shapeMapper
          },
          borderWidth: 1,
          borderColor: "#000000",
          size: 25,
          color: {
            defaultValue: "#ffffff",
            discreteMapper: {
              attrName: "surce",
              entries: [{
                attrValue: 0,
                value: "#ffffff"
              }, {
                attrValue: -1,
                value: "#ff0000"
              }, {
                attrValue: 1,
                value: "#0000ff"
              }, {
                attrValue: 2,
                value: "#ffff00"
              }
              ]
            }
          },
          labelHorizontalAnchor: "center",
          label: {
            passthroughMapper: {
              attrName: "name"
            }
          },
          tooltipText: "test"
        },
        edges: {
          style: {
            defaultValue: "SOLID",
            discreteMapper: {
              attrName: "modifier",
              entries: [{
                attrValue: "none",
                value: "SOLID"
              }, {
                attrValue: "stimulator",
                value: "EQUAL_DASH"
              }, {
                attrValue: "inhibitor",
                value: "EQUAL_DASH"
              }, {
                attrValue: "unknown",
                value: "EQUAL_DASH"
              }
              ]
            }

          },
          targetArrowShape: {
            defaultValue: "ARROW",
            discreteMapper: {
              attrName: "modifier",
              entries: [{
                attrValue: "none",
                value: "ARROW"
              }, {
                attrValue: "stimulator",
                value: "ARROW"
              }, {
                attrValue: "inhibitor",
                value: "T"
              }, {
                attrValue: "unknown",
                value: "CIRCLE"
              }
              ]
            }
          },
          width: 3,
          color: {
            defaultValue: "#000000",
            discreteMapper: {
              attrName: "surce",
              entries: [{
                attrValue: 1,
                value: "#000000"
              }, {
                attrValue: -1,
                value: "#ff0000"
              }, {
                attrValue: 1,
                value: "#0000ff"
              }, {
                attrValue: 2,
                value: "#ffff00"
              }
              ]
            }
          }
        }
      };

      var options = {
        swfPath: "bower_components/cytoscape_web/swf/CytoscapeWeb",
        flashInstallerPath: "bower_components/cytoscape_web/swf/playerProductInstall"
      };

      scope.$watch('graph', function(newVal, oldVal) {

        if (!newVal) {
          return;
        }
        drawDiffFlash(newVal);
        function drawDiffFlash(graph) {
          var draw_options = {
            network: graph,
            edgeLabelsVisible: true,
            layout: "ForceDirected",
            visualStyle: visual_style,
            panZoomControlVisible: panZoomControlVisible
          };

          var diffFlash = new org.cytoscapeweb.Visualization(id, options);
          diffFlash.draw(draw_options);
        }

        function drawTreeFlash(graph) {
          var draw_options = {
            network: graph,
            edgeLabelsVisible: true,
            layout: "ForceDirected",
            visualStyle: visual_style,
            panZoomControlVisible: panZoomControlVisible
          };

          var treeFlash = new org.cytoscapeweb.Visualization("graphtreeflash", options);
          treeFlash.draw(draw_options);
        }

        function drawModelVizFlash(graph) {
          var draw_options = {
            network: graph,
            edgeLabelsVisible: true,
            layout: "ForceDirected",
            visualStyle: visual_style,
            panZoomControlVisible: panZoomControlVisible
          };

          var treeFlash = new org.cytoscapeweb.Visualization("graphmodelvizflash", options);
          treeFlash.draw(draw_options);
        }
      });
    }
  };
});

