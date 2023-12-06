$(document).ready(function() {
    // Your JavaScript code goes here
    // <script>
        
    // $(document).ready(function() {
        
        // calculate SUS score function
        function calculateSUS() {
            // get question values and put in responses array
            var responses = new Array(10);
            for (i = 0; i < responses.length; i++) { 
                //responses[i] = $('#q10').val();
                responses[i]=parseInt($("input:radio[name ='sus-q"+(i+1)+"']:checked").val());
            }
            
            // calculate adjusted sum of scores for odd numbered questions
            var sum1=(responses[0]+responses[2]+responses[4]+responses[6]+responses[8])-5;
            // calculate adjusted sum of scores for even numbered questions
            var sum2=25-(responses[1]+responses[3]+responses[5]+responses[7]+responses[9]);
            // calculate and return total SUS score
            return (sum1+sum2)*2.5;
            
        }
        // display the SUS function
        function displaySUS(sus) {
            if (!Number.isNaN(sus)) {
                let outcomeClass, outcomeNote, grade, adjective;
        
                // Tentukan warna kartu dan catatan berdasarkan skor SUS
                if (sus > 68) {
                    outcomeClass = "card text-white bg-success mb-3";
                    outcomeNote = "Menurut standar konvensional, skor " + sus + " dianggap <b>di atas rata-rata</b>.";
                } else {
                    outcomeClass = "card text-white bg-danger mb-3";
                    outcomeNote = "Menurut standar konvensional, skor " + sus + (sus == 68 ? " dianggap <b>rata-rata</b>." : " dianggap <b>di bawah rata-rata</b>.");
                }
        
                // Tentukan grade berdasarkan skor SUS
                if (sus < 61) grade = "Grade F";
                else if (sus < 71) grade = "Grade D";
                else if (sus < 81) grade = "Grade C";
                else if (sus < 91) grade = "Grade B";
                else grade = "Grade A";
        
                // Tentukan adjektif berdasarkan skor SUS
                if (sus < 21) adjective = "<i>\"Worst Imaginable\"</i>";
                else if (sus < 36) adjective = "<i>\"Awful\"</i>";
                else if (sus < 51) adjective = "<i>\"Poor\"</i>";
                else if (sus < 72) adjective = "<i>\"Ok\"</i>";
                else if (sus < 86) adjective = "<i>\"Good\"</i>";
                else if (sus < 91) adjective = "<i>\"Excellent\"</i>";
                else adjective = "<i>\"Best Imaginable\"</i>";
        
                // Perbarui elemen DOM
                $("#outcome-card").attr("class", outcomeClass).removeAttr("hidden");
                $("#outcome-note").html(outcomeNote);
                $("#outcome-grade").html("Skor ini dianggap sebagai " + grade + ".");
                $("#outcome-adjective").html("Skor ini dapat digambarkan sebagai " + adjective + ".");
                $("#theScore").html("Skor SUS: " + sus);
                $("#warning-card").attr("hidden", "true");
            } else {
                // Skor SUS tidak valid - tampilkan peringatan
                $("#warning-card").removeAttr("hidden");
            }
        }
        
        function toggleCSS(cssMode) {
            
            // set the CSS link to Darkly
            if (cssMode) {
                // change the link and integrity check to Darkly
                $("#css-link").attr("integrity","sha384-rCA2D+D9QXuP2TomtQwd+uP50EHjpafN+wruul0sXZzX/Da7Txn4tB9aLMZV4DZm");
                $("#css-link").attr("href","https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/darkly/bootstrap.min.css");
                // dark div background colour
                $("#left-col").removeAttr("style");
                // add a clearer table style in this mode
                $("#sus-tab").attr("class","table table-striped");
            }
            // set the CSS link to Flatly
            else {
                // change the link and integrity check to Flatly
                $("#css-link").attr("integrity","sha384-yrfSO0DBjS56u5M+SjWTyAHujrkiYVtRYh2dtB3yLQtUz3bodOeialO59u5lUCFF");
                $("#css-link").attr("href","https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/flatly/bootstrap.min.css"); 
                // original div background colour
                $("#left-col").attr("style","background-color:white;");
                // original table style in this mode
                $("#sus-tab").attr("class","table table-striped");
            }
        }
            
        
        // calculate SUS score when input changes
        // $('input[type=radio]').on('input', function() {
        //     var sus = calculateSUS();
        //     displaySUS(sus);
        // });
        
        $('#submit-btn').on('click', function() {
            var sus = calculateSUS();
            displaySUS(sus);
        });
        
        // detect toggle of the 'Dark Mode' switch - a checkbox that is styled
        $( "input[type=checkbox]" ).on("click", function() {
            var cssMode = document.getElementById("css-mode").checked;
            toggleCSS(cssMode);
        });
        
        
        // calculate when page first (re)loads
        var sus = calculateSUS();
        
    // });
      
});