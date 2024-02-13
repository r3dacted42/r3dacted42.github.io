import 'package:flutter/material.dart';
import 'home.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  bool isDark_ = true;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Priyansh Agrahari",
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 4, 66, 101),
          brightness: (isDark_) ? Brightness.dark : Brightness.light,
        ),
      ),
      home: HomePage(
        onBrightnessToggle: (isDark) {
          setState(() {
            isDark_ = isDark;
          });
          return isDark;
        },
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}
