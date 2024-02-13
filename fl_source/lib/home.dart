import 'package:flutter/material.dart';
import 'package:flutter_carousel_widget/flutter_carousel_widget.dart';
import 'package:google_fonts/google_fonts.dart';

class HomePage extends StatefulWidget {
  const HomePage({
    super.key,
    required this.onBrightnessToggle,
  });

  final bool Function(bool isDark) onBrightnessToggle;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool isDark_ = true;

  Widget createNavTab(String name, IconData icon, String path) {
    return TextButton.icon(
      onPressed: () {},
      icon: Icon(icon),
      label: Text(name),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Theme.of(context).colorScheme.onPrimary,
        title: Text(
          'Priyansh Agrahari',
          style: GoogleFonts.ubuntu(),
        ),
        leading: DrawerButton(),
        actions: [
          IconButton(
            onPressed: () {
              setState(() {
                isDark_ = widget.onBrightnessToggle(!isDark_);
              });
            },
            icon: Icon((isDark_) ? Icons.light_mode : Icons.dark_mode),
          ),
        ],
      ),
      drawer: Drawer(
        child: SingleChildScrollView(
          child: Column(
            children: [
              ListTile(
                title: const Text('Sample Text'),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.ac_unit),
                  label: const Text('Sample #0'),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.ac_unit),
                  label: const Text('Sample #1'),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.ac_unit),
                  label: const Text('Sample #2'),
                ),
              ),
            ],
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            FlutterCarousel.builder(
              itemCount: 3,
              options: CarouselOptions(
                height: 500,
                showIndicator: true,
                enableInfiniteScroll: true,
                autoPlay: true,
                slideIndicator: CircularWaveSlideIndicator(),
              ),
              itemBuilder: (context, index, realIndex) {
                return Container(
                  color: Theme.of(context).colorScheme.inversePrimary,
                  width: MediaQuery.of(context).size.width,
                  margin: const EdgeInsets.symmetric(horizontal: 5.0),
                  child: Center(child: Text('#$index')),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
