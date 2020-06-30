"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var muse_1 = require("./../muse");
function zipSamples(eegReadings) {
    var buffer = [];
    var lastTimestamp = null;
    return eegReadings.pipe(operators_1.mergeMap(function (reading) {
        if (reading.timestamp !== lastTimestamp) {
            lastTimestamp = reading.timestamp;
            if (buffer.length) {
                var result = rxjs_1.from([buffer.slice()]);
                buffer.splice(0, buffer.length, reading);
                return result;
            }
        }
        buffer.push(reading);
        return rxjs_1.from([]);
    }), operators_1.concat(rxjs_1.from([buffer])), operators_1.mergeMap(function (readings) {
        var result = readings[0].samples.map(function (x, index) {
            var data = [NaN, NaN, NaN, NaN, NaN];
            for (var _i = 0, readings_1 = readings; _i < readings_1.length; _i++) {
                var reading = readings_1[_i];
                data[reading.electrode] = reading.samples[index];
            }
            return {
                data: data,
                index: readings[0].index,
                timestamp: readings[0].timestamp + index * 1000. / muse_1.EEG_FREQUENCY,
            };
        });
        return rxjs_1.from(result);
    }));
}
exports.zipSamples = zipSamples;
//# sourceMappingURL=zip-samples.js.map