import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemeToggle } from '../components/ThemeToggle';

export function ScanQrScreen({ isDarkMode }: { isDarkMode: boolean }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanResult, setScanResult] = useState<BarcodeScanningResult | null>(
    null
  );

  const handleOpenCamera = async () => {
    if (permission?.granted) {
      setScanResult(null);
      setIsCameraOpen(true);
      return;
    }

    const response = await requestPermission();

    if (response.granted) {
      setScanResult(null);
      setIsCameraOpen(true);
    }
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    setScanResult(result);
    setIsCameraOpen(false);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-zinc-900 px-8 pt-12 pb-12 rounded-b-[44px]">
        <View className="mb-8 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.25rem] text-emerald-300">
            Scan QR
          </Text>
          <ThemeToggle />
        </View>

        <Text className="text-4xl font-semibold leading-tight text-white">
          Open camera{'\n'}to scan.
        </Text>
      </View>

      <View className="px-8 pt-8">
        <View
          className={`rounded-lg border overflow-hidden ${
            isDarkMode
              ? 'border-zinc-800 bg-zinc-900'
              : 'border-zinc-100 bg-zinc-50'
          }`}
        >
          {isCameraOpen && permission?.granted ? (
            <View className="h-[360px]">
              <CameraView
                active={isCameraOpen}
                facing="back"
                onBarcodeScanned={
                  scanResult ? undefined : handleBarcodeScanned
                }
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                style={{ flex: 1 }}
              />
              <View
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
                className="items-center justify-center"
              >
                <View className="h-56 w-56 rounded-lg border-2 border-emerald-300" />
              </View>
            </View>
          ) : (
            <View className="min-h-[280px] items-center justify-center px-6 py-10">
              <View
                className={`h-20 w-20 rounded-full items-center justify-center ${
                  isDarkMode ? 'bg-zinc-950' : 'bg-white'
                }`}
              >
                <Feather
                  name="camera"
                  size={34}
                  color={isDarkMode ? '#34d399' : '#059669'}
                />
              </View>

              <Text
                className={`mt-5 text-center text-xl font-semibold ${
                  isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
                }`}
              >
                Camera permission required
              </Text>

              <Text
                className={`mt-2 text-center text-sm leading-5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Tap the button below to request camera access and scan a QR
                code.
              </Text>
            </View>
          )}
        </View>

        {scanResult ? (
          <View
            className={`mt-5 rounded-lg border p-5 ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-900'
                : 'border-zinc-100 bg-zinc-50'
            }`}
          >
            <Text
              className={`text-[10px] font-semibold uppercase tracking-[0.18rem] ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
              }`}
            >
              Scanned result
            </Text>
            <Text
              className={`mt-2 text-base leading-6 ${
                isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
              }`}
            >
              {scanResult.data}
            </Text>
          </View>
        ) : null}

        {!permission?.granted && permission?.canAskAgain === false ? (
          <Text className="mt-4 text-sm leading-5 text-red-400">
            Camera permission was denied. Enable it from device settings to scan
            QR codes.
          </Text>
        ) : null}

        <View className="mt-6 gap-3">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleOpenCamera}
            className={`rounded-lg py-4 items-center ${
              isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`text-sm font-semibold uppercase tracking-widest ${
                isDarkMode ? 'text-zinc-950' : 'text-white'
              }`}
            >
              {scanResult ? 'Scan again' : 'Open camera'}
            </Text>
          </TouchableOpacity>

          {isCameraOpen ? (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setIsCameraOpen(false)}
              className="py-3 items-center"
            >
              <Text
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Close camera
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
