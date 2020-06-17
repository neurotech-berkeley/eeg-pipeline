/// <reference types="web-bluetooth" />
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AccelerometerData, EEGReading, EventMarker, GyroscopeData, MuseControlResponse, MuseDeviceInfo, TelemetryData, XYZ } from './lib/muse-interfaces';
export { zipSamples, EEGSample } from './lib/zip-samples';
export { EEGReading, TelemetryData, AccelerometerData, GyroscopeData, XYZ, MuseControlResponse };
export declare const MUSE_SERVICE = 65165;
export declare const EEG_FREQUENCY = 256;
export declare const channelNames: string[];
export declare class MuseClient {
    enableAux: boolean;
    deviceName: string | null;
    connectionStatus: BehaviorSubject<boolean>;
    rawControlData: Observable<string>;
    controlResponses: Observable<MuseControlResponse>;
    telemetryData: Observable<TelemetryData>;
    gyroscopeData: Observable<GyroscopeData>;
    accelerometerData: Observable<AccelerometerData>;
    eegReadings: Observable<EEGReading>;
    eventMarkers: Subject<EventMarker>;
    private gatt;
    private controlChar;
    private eegCharacteristics;
    private lastIndex;
    private lastTimestamp;
    connect(gatt?: BluetoothRemoteGATTServer): Promise<void>;
    sendCommand(cmd: string): Promise<void>;
    start(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    deviceInfo(): Promise<MuseDeviceInfo>;
    injectMarker(value: string | number, timestamp?: number): Promise<void>;
    disconnect(): void;
    private getTimestamp(eventIndex);
}
