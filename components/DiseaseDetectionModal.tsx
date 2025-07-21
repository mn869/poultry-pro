import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { X, Camera, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Clock } from 'lucide-react-native';
import DiseaseDetectionCamera from './DiseaseDetectionCamera';

interface DiseaseDetectionModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DiseaseDetectionModal({ visible, onClose }: DiseaseDetectionModalProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCapture = async (imageUri: string) => {
    setShowCamera(false);
    setCapturedImage(imageUri);
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: 'Respiratory Infection',
        confidence: 87,
        symptoms: ['Difficulty breathing', 'Nasal discharge', 'Reduced activity'],
        recommendations: [
          'Isolate the bird immediately',
          'Provide adequate ventilation',
          'Consult a veterinarian',
          'Monitor other birds for similar symptoms'
        ],
        severity: 'moderate',
        treatment: 'Antibiotic treatment may be required. Consult with a veterinarian for proper diagnosis and treatment plan.'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleClose = () => {
    setShowCamera(false);
    setCapturedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    onClose();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#16A34A';
      case 'moderate': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#64748b';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return CheckCircle;
      case 'moderate': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return Clock;
    }
  };

  if (showCamera) {
    return (
      <Modal visible={visible} animationType="slide" statusBarHidden>
        <DiseaseDetectionCamera
          onClose={() => setShowCamera(false)}
          onCapture={handleCapture}
        />
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Disease Detection</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <X size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {!capturedImage ? (
              /* Initial State */
              <View style={styles.initialState}>
                <View style={styles.cameraIcon}>
                  <Camera size={48} color="#16A34A" />
                </View>
                <Text style={styles.initialTitle}>AI-Powered Disease Detection</Text>
                <Text style={styles.initialDescription}>
                  Take a photo of your bird to get instant analysis and health recommendations using our advanced AI technology.
                </Text>
                
                <View style={styles.featuresContainer}>
                  <View style={styles.feature}>
                    <CheckCircle size={20} color="#16A34A" />
                    <Text style={styles.featureText}>Instant analysis</Text>
                  </View>
                  <View style={styles.feature}>
                    <CheckCircle size={20} color="#16A34A" />
                    <Text style={styles.featureText}>High accuracy detection</Text>
                  </View>
                  <View style={styles.feature}>
                    <CheckCircle size={20} color="#16A34A" />
                    <Text style={styles.featureText}>Treatment recommendations</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.cameraButton} 
                  onPress={() => setShowCamera(true)}
                >
                  <Camera size={20} color="white" />
                  <Text style={styles.cameraButtonText}>Start Detection</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Results State */
              <View style={styles.resultsContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
                  {isAnalyzing && (
                    <View style={styles.analysisOverlay}>
                      <View style={styles.loadingSpinner} />
                      <Text style={styles.analysisText}>Analyzing image...</Text>
                    </View>
                  )}
                </View>

                {analysisResult && (
                  <View style={styles.resultsContent}>
                    <View style={styles.diagnosisCard}>
                      <View style={styles.diagnosisHeader}>
                        <Text style={styles.diagnosisTitle}>Diagnosis</Text>
                        <View style={[
                          styles.severityBadge,
                          { backgroundColor: `${getSeverityColor(analysisResult.severity)}15` }
                        ]}>
                          {React.createElement(getSeverityIcon(analysisResult.severity), {
                            size: 16,
                            color: getSeverityColor(analysisResult.severity)
                          })}
                          <Text style={[
                            styles.severityText,
                            { color: getSeverityColor(analysisResult.severity) }
                          ]}>
                            {analysisResult.severity.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                      
                      <Text style={styles.diseaseName}>{analysisResult.disease}</Text>
                      <Text style={styles.confidenceText}>
                        Confidence: {analysisResult.confidence}%
                      </Text>
                    </View>

                    <View style={styles.symptomsCard}>
                      <Text style={styles.cardTitle}>Detected Symptoms</Text>
                      {analysisResult.symptoms.map((symptom: string, index: number) => (
                        <View key={index} style={styles.symptomItem}>
                          <View style={styles.symptomDot} />
                          <Text style={styles.symptomText}>{symptom}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.treatmentCard}>
                      <Text style={styles.cardTitle}>Treatment Information</Text>
                      <Text style={styles.treatmentText}>{analysisResult.treatment}</Text>
                    </View>

                    <View style={styles.recommendationsCard}>
                      <Text style={styles.cardTitle}>Immediate Actions</Text>
                      {analysisResult.recommendations.map((recommendation: string, index: number) => (
                        <View key={index} style={styles.recommendationItem}>
                          <Text style={styles.recommendationNumber}>{index + 1}</Text>
                          <Text style={styles.recommendationText}>{recommendation}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.retakeButton} onPress={() => {
                        setCapturedImage(null);
                        setAnalysisResult(null);
                        setShowCamera(true);
                      }}>
                        <Text style={styles.retakeButtonText}>Take Another Photo</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save Report</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  initialState: {
    padding: 20,
    alignItems: 'center',
  },
  cameraIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  initialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  initialDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16A34A',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  capturedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  analysisOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#16A34A',
    borderTopColor: 'transparent',
    marginBottom: 12,
  },
  analysisText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  resultsContent: {
    gap: 16,
  },
  diagnosisCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#16A34A',
  },
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diagnosisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 14,
    color: '#64748b',
  },
  symptomsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 12,
  },
  symptomText: {
    fontSize: 14,
    color: '#374151',
  },
  treatmentCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
  },
  treatmentText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  recommendationsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#16A34A',
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  retakeButtonText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});