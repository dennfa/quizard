package com.example.backend.services;

import com.example.backend.models.MultipleChoiceQuiz;
import com.example.backend.repos.MultipleChoiceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MultipleChoiceService {

    private final MultipleChoiceRepo multipleChoiceRepo;

    public MultipleChoiceQuiz addQuiz(MultipleChoiceQuiz multipleChoiceQuiz) {
        return multipleChoiceRepo.save(multipleChoiceQuiz);
    }

    public List<MultipleChoiceQuiz> getAllQuizzes() {
        return multipleChoiceRepo.findAll();
    }

    public MultipleChoiceQuiz getQuizById(String id) {
        return multipleChoiceRepo.findById(id).orElseThrow();
    }

    public MultipleChoiceQuiz updateQuiz(MultipleChoiceQuiz multipleChoiceQuiz){
        if(multipleChoiceRepo.findById(multipleChoiceQuiz.id()).isEmpty()) throw new NoSuchElementException();
        return multipleChoiceRepo.save(multipleChoiceQuiz);
    }

    public void deleteQuiz( String id){
        multipleChoiceRepo.deleteById(id);
    }
}
