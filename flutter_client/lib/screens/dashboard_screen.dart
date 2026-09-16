import 'package:flutter/material';
import '../main.dart';
import 'study_hall_screen.dart';
import 'ocr_evaluation_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    // Standard modular tabs
    final List<Widget> screens = [
      const DashboardHome(),
      const Center(child: Text('Syllabus Hub Material Collapsible List Tree')),
      const StudyHallScreen(),
      const OcrEvaluationScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        // Centered App Title
        title: const Text(
          'CA JS',
          style: TextStyle(
            color: Color(0xFF334155),
            fontWeight: FontWeight.bold,
            letterSpacing: 2.0,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.redAccent),
            onPressed: () => Navigator.pushReplacementNamed(context, '/auth'),
          ),
        ],
      ),
      body: screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: PastelColors.blueDark,
        unselectedItemColor: Colors.grey,
        onTap: (idx) => setState(() => _currentIndex = idx),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.book_rounded), label: 'Syllabus'),
          BottomNavigationBarItem(icon: Icon(Icons.timer_rounded), label: 'Pomodoro'),
          BottomNavigationBarItem(icon: Icon(Icons.document_scanner_rounded), label: 'OCR Evaluator'),
        ],
      ),
    );
  }
}

class DashboardHome extends StatelessWidget {
  const DashboardHome({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Dynamic User Header Banner
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: PastelColors.purple,
                    radius: 24,
                    child: Text('JK', style: TextStyle(color: PastelColors.purpleDark, fontWeight: FontWeight.bold)),
                  ),
                  const SizedBox(width: 16),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Jananni Kumar',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 2),
                      // Automatically generated alphanumeric user ID
                      Text(
                        'User ID: CA-STUDENT',
                        style: TextStyle(fontSize: 12, color: Colors.grey, fontFamily: 'monospace'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // 3 Pastel Performance Gauge Cards
          const Text('Performance Tracking Metrics', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 3,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            children: [
              // Gauge 1
              _buildGaugeCard(
                'Syllabus %',
                '62%',
                PastelColors.blue,
                PastelColors.blueDark,
              ),
              // Gauge 2
              _buildGaugeCard(
                'Mock %',
                '45%',
                PastelColors.green,
                PastelColors.greenDark,
              ),
              // Gauge 3
              _buildGaugeCard(
                'Revision %',
                '80%',
                PastelColors.purple,
                PastelColors.purpleDark,
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Smart Revision Alert Box
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: PastelColors.orange.withOpacity(0.6),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: PastelColors.orangeDark.withOpacity(0.2)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.lightbulb_rounded, color: PastelColors.orangeDark, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'What to Revise Today',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF334155)),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                _buildSuggestionItem('1. Sacrifice goodwill adjustments', 'Calculation Issue weak topic logged in Mistakes Tracker.'),
                const SizedBox(height: 8),
                _buildSuggestionItem('2. GST Time of Supply (Sec 12/13)', 'Trending chapters analyzed in RTP/MTP databases.'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGaugeCard(String title, String val, Color bg, Color textC) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: Colors.black54)),
          const SizedBox(height: 6),
          Text(val, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: textC)),
        ],
      ),
    );
  }

  Widget _buildSuggestionItem(String title, String subtitle) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF475569))),
        Text(subtitle, style: const TextStyle(fontSize: 11, color: Colors.black54)),
      ],
    );
  }
}
