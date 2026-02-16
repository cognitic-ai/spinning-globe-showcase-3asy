import { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import * as AC from "@bacons/apple-colors";
import CobeGlobe from "@/components/cobe-globe";

const LOCATIONS = [
  { name: "San Francisco", flag: "US", lat: 37.77, lng: -122.42 },
  { name: "New York", flag: "US", lat: 40.71, lng: -74.0 },
  { name: "London", flag: "GB", lat: 51.51, lng: -0.13 },
  { name: "Tokyo", flag: "JP", lat: 35.68, lng: 139.65 },
  { name: "Paris", flag: "FR", lat: 48.86, lng: 2.35 },
  { name: "Sydney", flag: "AU", lat: -33.87, lng: 151.21 },
  { name: "Singapore", flag: "SG", lat: 1.35, lng: 103.82 },
  { name: "Moscow", flag: "RU", lat: 55.76, lng: 37.62 },
  { name: "Sao Paulo", flag: "BR", lat: -23.55, lng: -46.63 },
  { name: "Mexico City", flag: "MX", lat: 19.43, lng: -99.13 },
];

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 100,
        backgroundColor: AC.secondarySystemGroupedBackground as any,
        borderRadius: 16,
        borderCurve: "continuous",
        padding: 14,
        gap: 8,
      }}
    >
      <Image
        source={`sf:${icon}`}
        style={{ width: 22, height: 22, tintColor: AC.systemBlue as any }}
      />
      <Text
        selectable
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: AC.label as any,
          fontVariant: ["tabular-nums"],
        }}
      >
        {value}
      </Text>
      <Text style={{ fontSize: 13, color: AC.secondaryLabel as any }}>
        {title}
      </Text>
    </View>
  );
}

function LocationRow({
  name,
  index,
  isActive,
  onPress,
}: {
  name: string;
  index: number;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.selectionAsync();
        }
        onPress();
      }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: isActive
          ? (AC.systemBlue as any)
          : pressed
          ? (AC.tertiarySystemGroupedBackground as any)
          : "transparent",
        borderRadius: 12,
        borderCurve: "continuous",
        gap: 12,
      })}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: isActive
            ? "rgba(255,255,255,0.2)"
            : (AC.tertiarySystemGroupedBackground as any),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: isActive ? "#fff" : (AC.secondaryLabel as any),
            fontVariant: ["tabular-nums"],
          }}
        >
          {index + 1}
        </Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: "500",
          color: isActive ? "#fff" : (AC.label as any),
        }}
      >
        {name}
      </Text>
      <Image
        source="sf:chevron.right"
        style={{
          width: 12,
          height: 12,
          tintColor: isActive
            ? "rgba(255,255,255,0.6)"
            : (AC.tertiaryLabel as any),
        }}
      />
    </Pressable>
  );
}

export default function IndexRoute() {
  const [activeLocation, setActiveLocation] = useState(0);
  const { width } = useWindowDimensions();
  const globeSize = Math.min(width - 32, 360);

  const handleShare = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 40 }}
      >
        {/* Globe card */}
        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground as any,
            borderRadius: 24,
            borderCurve: "continuous",
            overflow: "hidden",
            alignItems: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <CobeGlobe
            dark
            dom={{
              scrollEnabled: false,
              contentInsetAdjustmentBehavior: "never",
              style: {
                width: globeSize,
                height: globeSize,
                backgroundColor: "transparent",
              },
            }}
          />
          <View
            style={{
              width: "100%",
              padding: 16,
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label as any,
              }}
            >
              {LOCATIONS[activeLocation].name}
            </Text>
            <Text
              selectable
              style={{ fontSize: 14, color: AC.secondaryLabel as any }}
            >
              {LOCATIONS[activeLocation].lat.toFixed(2)}
              {"\u00B0"} N, {Math.abs(LOCATIONS[activeLocation].lng).toFixed(2)}
              {"\u00B0"} {LOCATIONS[activeLocation].lng >= 0 ? "E" : "W"}
            </Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <StatCard title="Locations" value="10" icon="mappin.and.ellipse" />
          <StatCard title="Connections" value="1.4M" icon="antenna.radiowaves.left.and.right" />
          <StatCard title="Latency" value="38ms" icon="bolt.fill" />
        </View>

        {/* Locations list */}
        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground as any,
            borderRadius: 20,
            borderCurve: "continuous",
            padding: 6,
            gap: 2,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: AC.secondaryLabel as any,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 4,
            }}
          >
            Active Nodes
          </Text>
          {LOCATIONS.map((loc, i) => (
            <LocationRow
              key={loc.name}
              name={loc.name}
              index={i}
              isActive={activeLocation === i}
              onPress={() => setActiveLocation(i)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Toolbar buttons */}
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button icon="square.and.arrow.up" onPress={handleShare} />
        <Stack.Toolbar.Menu icon="ellipsis.circle">
          <Stack.Toolbar.MenuAction
            icon="arrow.clockwise"
            onPress={handleRefresh}
          >
            Refresh Data
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction icon="slider.horizontal.3">
            Settings
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.Menu inline title="View">
            <Stack.Toolbar.MenuAction icon="globe" isOn>
              Globe
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction icon="list.bullet">
              List
            </Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>
      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.Button icon="map" onPress={() => {}}>
          Map
        </Stack.Toolbar.Button>
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button
          icon="plus.circle.fill"
          onPress={handleRefresh}
          separateBackground
        />
      </Stack.Toolbar>
    </>
  );
}
