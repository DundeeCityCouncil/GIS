<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
 xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
 xmlns="http://www.opengis.net/sld" 
 xmlns:ogc="http://www.opengis.net/ogc" 
 xmlns:xlink="http://www.w3.org/1999/xlink" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <!-- a Named Layer is the basic building block of an SLD document -->
  <NamedLayer>
    <Name>default_cag</Name>
    <UserStyle>
    <!-- Styles can have names, titles and abstracts -->
      <Title>Primary Classification</Title>
      <Abstract>Draws corporate address gazetteer based on high-level classification.</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- A FeatureTypeStyle for rendering points -->
      <FeatureTypeStyle>
        <Rule>
          <Name>Residential (Constructed)</Name>
          <Title>Residential (Constructed)</Title>
          <Abstract>Constructed residential properties.</Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>R</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>2</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                  <Fill>
                    <CssParameter name="fill">#004DA8</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
                <Rule>
          <Name>Residential (Not Constructed)</Name>
          <Title>Residential (Not Constructed)</Title>
          <Abstract>residential properties.</Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>R</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>1</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                <Stroke>
               <CssParameter name="stroke">#004DA8</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        
                        <Rule>
          <Name>Commercial (Constructed)</Name>
          <Title>Commercial (Constructed)</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>C</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>2</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                                <Fill>
                    <CssParameter name="fill">#C500FF</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>

                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
                                <Rule>
          <Name>Commercial (Not Constructed)</Name>
          <Title>Commercial (Not Constructed)</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>C</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>1</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                <Stroke>
               <CssParameter name="stroke">#C500FF</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        
                                <Rule>
          <Name>Lock-up Garages (Constructed)</Name>
          <Title>Lock-up Garages (Constructed)</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>RG02</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>2</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
             <Fill>
                    <CssParameter name="fill">#7AB6F5</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
                                <Rule>
          <Name>Lock-up Garages (Not Constructed)</Name>
          <Title>Lock-up Garages (Not Constructed)</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>RG02</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>1</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                <Stroke>
               <CssParameter name="stroke">#7AB6F5</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
                
                                <Rule>
          <Name>Land</Name>
          <Title>Land</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
         
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>L</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                      
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                                                                        <Fill>
                    <CssParameter name="fill">#55FF00</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>

                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        
                                        <Rule>
          <Name>Property Shell</Name>
          <Title>Property Shell</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>PP</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                            
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>circle</WellKnownName>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>14</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        
                                                <Rule>
          <Name>Street BLPU</Name>
          <Title>Street BLPU</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>PS</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>circle</WellKnownName>
                                                                                          <Fill>
                    <CssParameter name="fill">#FF0000</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>                  
             </Stroke>

                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
                
                                                <Rule>
          <Name>Features</Name>
          <Title>Features</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>Z</ogc:Literal>
         </ogc:PropertyIsEqualTo>
          <ogc:PropertyIsEqualTo>
             <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>2</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>star</WellKnownName>
    <Fill>
                    <CssParameter name="fill">#730000</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>                  
             </Stroke>

                </Mark>
              <Size>14</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        
         <Rule>
          <Name>Unclassified (Constructed)</Name>
          <Title>Unclassified (Constructed)</Title>
          <Abstract>.</Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>U</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>2</ogc:Literal>
         </ogc:PropertyIsEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                  <Fill>
                    <CssParameter name="fill">#FFFF00</CssParameter>
                  </Fill>
                <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
                <Rule>
          <Name>Unclassified</Name>
          <Title>Unclassified</Title>
          <Abstract></Abstract>
                 <ogc:Filter>
                   <ogc:And> 
         <ogc:PropertyIsEqualTo>
           <ogc:PropertyName>CLASSIFICATION</ogc:PropertyName>
           <ogc:Literal>U</ogc:Literal>
         </ogc:PropertyIsEqualTo>
             <ogc:PropertyIsNotEqualTo>
           <ogc:PropertyName>BLPU_STATE</ogc:PropertyName>
           <ogc:Literal>2</ogc:Literal>
         </ogc:PropertyIsNotEqualTo>
                   </ogc:And>           
       </ogc:Filter>
            <PointSymbolizer>
              <Graphic>
                <Mark>
                  <WellKnownName>square</WellKnownName>
                <Stroke>
               <CssParameter name="stroke">#FFFF00</CssParameter>
               <CssParameter name="stroke-width">1</CssParameter>
             </Stroke>
                </Mark>
              <Size>8</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
        
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
