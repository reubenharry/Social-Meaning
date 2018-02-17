// Basic RSA model

// possible objects of reference
var listenerPrior = function() {
  categorical({vs:persona_values,ps:[0.01,0.01,0.01,0.97]})
}
//               [0.25,0.25,0.25,0.25]
// [0.2,0.2,0.3,0.3]
//               [0.05,0.05,0.45,0.45]
var persona_values = ["sternLeader","coolGuy","idiot","asshole"]

var personae = {
    sternLeader:{competent: true, friendly: false}, // sternleader
    coolGuy:{competent: true, friendly: true}, // coolguy
    idiot:{competent: false, friendly: true}, // idiot
    asshole:{competent: false, friendly: false}, // asshole
    }

var values = {
    sternLeader:1.0, // sternleader
    coolGuy:0.0, // coolguy
    idiot:0.0, // idiot
    asshole:0.0, // asshole
}

// var values = [1,0.5,0,0]

// possible one-word utterances
var utterances = ["in","ing"]

// meaning function to interpret the utterances
var meaning = function(utterance, persona){
  utterance === "in" ? !personae[persona]["competent"] || personae[persona]["friendly"]  :
  utterance === "ing" ? personae[persona]["competent"] || !personae[persona]["friendly"] :
  false
}

// literal listener
var l0 = function(utterance){
  Infer({model: function(){
    var persona = listenerPrior();
    condition(meaning(utterance, persona))
    return persona
  }})
}

// set speaker optimality
var alpha = 1

// pragmatic speaker
var s1 = function(values){
  Infer({model: function(){
    var utterance = uniformDraw(utterances)
    var persona = categorical({vs:persona_values,ps:values})
    
    var utility = (l0(utterance).score(persona))

    //categorical(vs:personae,ps:values)
    factor(alpha * utility)
    return [utterance,persona]
  }})
}

// pragmatic listener
var l1 = function(utterance,values){
  Infer({model: function(){
    var persona = listenerPrior()
    factor(s1(values).score([utterance,persona]))
    return persona
  }})
}

ex_values = [0.25,0.25,0.25,0.25]

print("literal listener's interpretation of 'in':")
viz.table(l0( "in"))
print("speaker's utterance distribution:")
viz.table(s1(ex_values))
print("pragmatic listener's interpretation of 'in':")
viz.table(pragmaticListener("in",ex_values))

print(Math.exp(s1(ex_values).score(["in","idiot"])))
print(Math.exp(s1(ex_values).score(["ing","idiot"])))

print(Math.exp(s1(ex_values).score(["in","coolGuy"])))
print(Math.exp(s1(ex_values).score(["ing","coolGuy"])))


// -- quds: models: burnouts use urban things to index subset of urban things: an s2 can do this successfully
//   -- eg: let's say men use in more: when i use in, being a woman, i index not man but something else:
//     -- this means man can't be basis: has to be construct:
//     -- maybe try gay as a complex thing, and then subtype with qud

//   -- hard to convince someone you don't belong to category man; so indexing "woman" strongly suggests qud

// --city and rough, but i'm rural and want to index rough:
//   -- so i can say "in", even though naturally, only city speakers say it
//     -- prior that i'm rural is very high, but rough uncertain

