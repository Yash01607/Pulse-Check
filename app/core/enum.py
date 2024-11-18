import enum


class GraphNode(str, enum.Enum):
    def __str__(self):
        return str(self.value)

    DOCUMENT_SPLITTER = "DOCUMENT_SPLITTER"
    QUESTION_CREATOR = "QUESTION_CREATOR"
    TOPIC_GENERATOR = "TOPIC_GENERATOR"
    QUESTIONS_CLASSIFIER = "QUESTIONS_CLASSIFIER"
    ANSWERER = "ANSWERER"
    QUESTION_EXTRACTION = "QUESTION_EXTRACTION"

    def get_prev_node(self):
        if self == GraphNode.DOCUMENT_SPLITTER:
            return None
        elif self == GraphNode.QUESTION_CREATOR:
            return GraphNode.DOCUMENT_SPLITTER
        elif self == GraphNode.QUESTION_CREATOR:
            return GraphNode.DOCUMENT_SPLITTER
        elif self == GraphNode.TOPIC_GENERATOR:
            return GraphNode.QUESTION_CREATOR
        elif self == GraphNode.QUESTIONS_CLASSIFIER:
            return GraphNode.TOPIC_GENERATOR
        elif self == GraphNode.ANSWERER:
            return GraphNode.QUESTIONS_CLASSIFIER
        return None


class LLMAction(str, enum.Enum):
    def __str__(self):
        return str(self.value)

    IMAGE_SUMMARIZER = "IMAGE_SUMMARIZER"
    QUESTION_CREATOR = "QUESTION_CREATOR"
    TOPIC_GENERATOR = "TOPIC_GENERATOR"
    QUESTIONS_CLASSIFIER = "QUESTIONS_CLASSIFIER"
    QUESTION_EXTRACTION_TRANSCRIPT_BAK = "QUESTION_EXTRACTION_TRANSCRIPT_BAK"
    QUESTION_EXTRACTION_TRANSCRIPT = "QUESTION_EXTRACTION_TRANSCRIPT"
    TRANSCRIPT_QUESTION_CLASSIFIER_ALLOW_NEW_TOPICS = "TRANSCRIPT_QUESTION_CLASSIFIER_ALLOW_NEW_TOPICS"
    TRANSCRIPT_QUESTION_CLASSIFIER_EXISTING_TOPICS_ONLY = "TRANSCRIPT_QUESTION_CLASSIFIER_EXISTING_TOPICS_ONLY"
    FAQ_TOPIC_RECONCILER = "FAQ_TOPIC_RECONCILER"

class SortOrder(str, enum.Enum):
    def __str__(self):
        return str(self.value)

    ASC = "ASC"
    DESC = "DESC"