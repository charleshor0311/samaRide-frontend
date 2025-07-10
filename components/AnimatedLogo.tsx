import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

interface AnimatedLogoProps {
  size?: number;
  color?: string;
}

export default function AnimatedLogo({ size = 120, color = '#2563EB' }: AnimatedLogoProps) {
  const strokeDashoffset = useSharedValue(1000);
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Scale animation
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.back(1.5)),
    });

    // Stroke animation
    strokeDashoffset.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });

    // Subtle rotation animation
    rotation.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(-2, { duration: 3000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    );
  }, []);

  const animatedGroupProps = useAnimatedProps(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  const animatedPathProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <AnimatedG animatedProps={animatedGroupProps}>
          {/* Car body */}
          <AnimatedPath
            d="M40 120 L40 100 Q40 90 50 90 L150 90 Q160 90 160 100 L160 120 L170 120 Q180 120 180 130 L180 140 Q180 150 170 150 L160 150 L160 160 Q160 170 150 170 L140 170 Q130 170 130 160 L130 150 L70 150 L70 160 Q70 170 60 170 L50 170 Q40 170 40 160 L40 150 L30 150 Q20 150 20 140 L20 130 Q20 120 30 120 Z"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            animatedProps={animatedPathProps}
          />
          
          {/* Car windows */}
          <AnimatedPath
            d="M50 100 L50 85 Q50 80 55 80 L95 80 L95 100 Z"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="200"
            animatedProps={animatedPathProps}
          />
          
          <AnimatedPath
            d="M105 100 L105 80 L145 80 Q150 80 150 85 L150 100 Z"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="200"
            animatedProps={animatedPathProps}
          />
          
          {/* Wheels */}
          <AnimatedPath
            d="M60 150 Q60 140 70 140 Q80 140 80 150 Q80 160 70 160 Q60 160 60 150 Z"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="100"
            animatedProps={animatedPathProps}
          />
          
          <AnimatedPath
            d="M120 150 Q120 140 130 140 Q140 140 140 150 Q140 160 130 160 Q120 160 120 150 Z"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="100"
            animatedProps={animatedPathProps}
          />
          
          {/* Motion lines */}
          <AnimatedPath
            d="M10 110 L25 110 M10 125 L20 125 M10 140 L25 140"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="50"
            animatedProps={animatedPathProps}
          />
          
          {/* People icons inside car */}
          <AnimatedPath
            d="M65 95 Q65 90 70 90 Q75 90 75 95 Q75 100 70 100 Q65 100 65 95 Z"
            fill={color}
            opacity="0.6"
          />
          
          <AnimatedPath
            d="M125 95 Q125 90 130 90 Q135 90 135 95 Q135 100 130 100 Q125 100 125 95 Z"
            fill={color}
            opacity="0.6"
          />
        </AnimatedG>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});