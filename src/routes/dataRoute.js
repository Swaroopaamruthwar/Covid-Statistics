// app.js
const express = require('express');
const router = express.Router()
const statesData = require('../data');
router.get('/totalRecovered', (req, res) => {

    const totalRecovered = statesData.data.reduce((acc, curr) => acc + curr.infected, 0);
    res.json({ data: { _id: 'total', recovered: totalRecovered } });
});



router.get('/totalActive', (req, res) => {
    let totalActive = 0;
    statesData.data.forEach(state => {
        const active = state.infected - state.recovered;
        totalActive += active;
    });
    const response = {
        data: {
            _id: 'total',
            active: totalActive,
        },
    };
    res.json(response);
});

router.get('/totalDeath', (req, res) => {
    const totalDeath = statesData.data.reduce((acc, state) => {
        return acc + state.death;
    }, 0);

    res.json({ data: { _id: 'total', death: totalDeath } });
});


router.get('/hotspotStates', (req, res) => {
    const result = statesData.data.filter(state => ((state.infected - state.recovered) / state.infected) > 0.1).map(state => ({ state: state._id, rate: parseFloat(((state.infected - state.recovered) / state.infected).toFixed(5)) }));
    res.json({ data: result });
});



router.get('/healthyStates', (req, res) => {
    const result =  statesData.data.filter(state => {
        const mortality = state.death / state.infected;
        return mortality < 0.005;
    }).map(state => {
        const mortality = state.death / state.infected;
        return {
            state: state.state,
            mortality: Math.round(mortality * 100000) / 100000
        };
    });
    res.json({ data: result });
});

module.exports = router;