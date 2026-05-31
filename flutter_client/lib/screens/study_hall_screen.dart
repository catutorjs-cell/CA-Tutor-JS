import 'package:flutter/material';
import '../main.dart';

class StudyHallScreen extends StatefulWidget {
  const StudyHallScreen({super.key});

  @override
  State<StudyHallScreen> createState() => _StudyHallScreenState();
}

class _StudyHallScreenState extends State<StudyHallScreen> {
  int _duration = 25;
  int _secondsLeft = 25 * 60;
  bool _isRunning = false;
  String _mode = 'Solo'; // Solo, Group
  final _roomController = TextEditingController();
  int _occupancy = 0;
  Color _cardBg = Colors.white.withOpacity(0.75);

  void _adjustDuration(double val) {
    if (_isRunning) return;
    setState(() {
      _duration = val.toInt();
      _secondsLeft = _duration * 60;
    });
  }

  void _startTimer() {
    setState(() => _isRunning = true);
    // Simple mock countdown trigger
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted || !_isRunning) return;
      setState(() {
        _secondsLeft = 0; // Immediately finish for demonstration
        _isRunning = false;
      });
      _onTimerComplete();
    });
  }

  void _onTimerComplete() {
    final double mult = _mode == 'Group' ? 1.5 : 1.0;
    final int points = (_duration * mult).round();
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('🎉 Study Hall Session Complete!'),
        content: Text('Congratulations! You completed $_duration minutes study timer.\nAccrued points: $points added to your profile!'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _secondsLeft = _duration * 60;
              });
            },
            child: const Text('Great!'),
          ),
        ],
      ),
    );
  }

  void _joinGroupRoom() {
    final room = _roomController.text;
    if (room.isEmpty) return;

    final int activeOccupants = (room.length % 5) + 1;
    setState(() {
      _occupancy = activeOccupants;
      
      // Swap backgrounds dynamically based on room occupancy size
      if (activeOccupants > 4) {
        _cardBg = PastelColors.pink.withOpacity(0.9);
      } else if (activeOccupants > 2) {
        _cardBg = PastelColors.blue.withOpacity(0.9);
      } else {
        _cardBg = PastelColors.green.withOpacity(0.9);
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Joined Room: $room. Occupants size: $activeOccupants. Active team multiplier enabled!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    final int mins = _secondsLeft ~/ 60;
    final int secs = _secondsLeft % 60;

    return Container(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          const Align(
            alignment: Alignment.centerLeft,
            child: Text(
              'Pomodoro Study Hall',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 16),

          // Clock Widget card
          Card(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  Text(
                    '${mins.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}',
                    style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, fontFamily: 'monospace'),
                  ),
                  const SizedBox(height: 12),
                  Slider(
                    min: 5,
                    max: 60,
                    value: _duration.toDouble(),
                    onChanged: _isRunning ? null : _adjustDuration,
                  ),
                  Text('Duration: $_duration minutes', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        onPressed: _isRunning ? () => setState(() => _isRunning = false) : _startTimer,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _isRunning ? PastelColors.orange : PastelColors.green,
                        ),
                        child: Text(_isRunning ? 'Pause' : 'Start Timer'),
                      ),
                      const SizedBox(width: 12),
                      OutlinedButton(
                        onPressed: () => setState(() {
                          _isRunning = false;
                          _secondsLeft = _duration * 60;
                        }),
                        child: const Text('Reset'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Group room networking controls
          AnimatedContainer(
            duration: const Duration(milliseconds: 500),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: _cardBg,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.white.withOpacity(0.6)),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => setState(() { _mode = 'Solo'; _cardBg = Colors.white.withOpacity(0.75); _occupancy = 0; }),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _mode == 'Solo' ? Colors.white : Colors.transparent,
                          elevation: _mode == 'Solo' ? 1 : 0,
                        ),
                        child: const Text('👤 Solo Mode'),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => setState(() => _mode = 'Group'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _mode == 'Group' ? Colors.white : Colors.transparent,
                          elevation: _mode == 'Group' ? 1 : 0,
                        ),
                        child: const Text('👥 Group Room'),
                      ),
                    ),
                  ],
                ),
                if (_mode == 'Group') ...[
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _roomController,
                          decoration: const InputDecoration(
                            hintText: 'Enter Room ID (e.g. AUDIT_ROOM)',
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.all(10),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      ElevatedButton(
                        onPressed: _joinGroupRoom,
                        child: const Text('Join'),
                      ),
                    ],
                  ),
                  if (_occupancy > 0) ...[
                    const SizedBox(height: 12),
                    Text(
                      'Connected! Active occupancy size: $_occupancy online.',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: PastelColors.purpleDark, fontSize: 12),
                    ),
                  ],
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
