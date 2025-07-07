document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('data-form');
  const tableBody = document.getElementById('table-body');
  const searchInput = document.getElementById('search-input');

  let dataEntries = [];
  let filteredEntries = [];

  // Tự động điền năm hiện tại - 1
  document.getElementById('year-input').value = new Date().getFullYear() - 1;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const year = parseInt(document.getElementById('year-input').value, 10);
    const journalName = document.getElementById('journal-name-input').value.trim();
    const hIndex = parseInt(document.getElementById('h-index-input').value, 10);
    const subjectCategory = document.getElementById('subject-category-input').value.trim();
    const numJournals = parseInt(document.getElementById('num-journals-input').value, 10);
    const journalRanking = parseInt(document.getElementById('journal-ranking-input').value, 10);
    const qualityIndex = parseInt(document.getElementById('quality-index-input').value, 10);

    if (isNaN(year) || !journalName || isNaN(hIndex) || !subjectCategory || isNaN(numJournals) || isNaN(journalRanking) || isNaN(qualityIndex)) {
      alert('Please enter valid values.');
      return;
    }

    const existingIndex = dataEntries.findIndex(entry => 
      entry.journalName === journalName && entry.subjectCategory === subjectCategory
    );

    const newEntry = {
      year, journalName, hIndex, subjectCategory, numJournals, journalRanking, qualityIndex
    };

    if (existingIndex !== -1) {
      dataEntries[existingIndex] = newEntry;
    } else {
      dataEntries.push(newEntry);
    }

    renderTable(dataEntries);
    form.reset();
    document.getElementById('year-input').value = new Date().getFullYear() - 1;
  });

  searchInput.addEventListener('input', e => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      filteredEntries = [...dataEntries];
    } else {
      filteredEntries = dataEntries.filter(entry =>
        entry.journalName.toLowerCase().includes(query)
      );
    }
    renderTable(filteredEntries);
  });

  function renderTable(entries) {
    if (entries.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="9" class="no-data">No data entered yet.</td></tr>';
      return;
    }

    entries.sort((a, b) => a.journalName.localeCompare(b.journalName));

    tableBody.innerHTML = entries.map(entry => {
      const vluPercent = (entry.journalRanking / entry.numJournals) * 100;
      const vluRanking = getVluRanking(entry.numJournals, entry.qualityIndex, vluPercent);

      return `
        <tr onclick="editEntry(${entries.indexOf(entry)})">
          <td>${entry.year}</td>
          <td>${escapeHtml(entry.journalName)}</td>
          <td>${entry.hIndex}</td>
          <td>${escapeHtml(entry.subjectCategory)}</td>
          <td>${entry.numJournals}</td>
          <td>${entry.journalRanking}</td>
          <td>${entry.qualityIndex}</td>
          <td>${vluPercent.toFixed(2)}%</td>
          <td>${vluRanking}</td>
        </tr>
      `;
    }).join('');
  }
  window.editEntry = function(index) {
    const entry = dataEntries[index];
    document.getElementById('year-input').value = entry.year;
    document.getElementById('journal-name-input').value = entry.journalName;
    document.getElementById('h-index-input').value = entry.hIndex;
    document.getElementById('subject-category-input').value = entry.subjectCategory;
    document.getElementById('num-journals-input').value = entry.numJournals;
    document.getElementById('journal-ranking-input').value = entry.journalRanking;
    document.getElementById('quality-index-input').value = entry.qualityIndex;
  };

  function getVluRanking(numJournals, qualityIndex, percent) {
    // Giả định công thức ranking đơn giản cho bản demo
	let vluRanking = '';
		if (entry.numJournals >= 2000) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 5.00) {
			  vluRanking = 1;
			} else if (vluPercent < 10.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 18.00) {
			  vluRanking = 3;
			} else if (vluPercent < 30.00) {
			  vluRanking = 4;
			} else if (vluPercent < 43.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 56.00) {
			  vluRanking = 6;
			} else if (vluPercent < 69.00) {
			  vluRanking = 7;
			} else if (vluPercent < 82.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 82.00) {
			  vluRanking = 9;
			}
		  }
		} else if (entry.numJournals >= 1500 && entry.numJournals < 2000) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 6.00) {
			  vluRanking = 1;
			} else if (vluPercent < 11.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 19.00) {
			  vluRanking = 3;
			} else if (vluPercent < 31.00) {
			  vluRanking = 4;
			} else if (vluPercent < 44.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 57.00) {
			  vluRanking = 6;
			} else if (vluPercent < 70.00) {
			  vluRanking = 7;
			} else if (vluPercent < 83.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 83.00) {
			  vluRanking = 9;
			}
		  }
		} else if (entry.numJournals >= 1000 && entry.numJournals < 1500) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 7.00) {
			  vluRanking = 1;
			} else if (vluPercent < 12.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 20.00) {
			  vluRanking = 3;
			} else if (vluPercent < 32.00) {
			  vluRanking = 4;
			} else if (vluPercent < 45.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 58.00) {
			  vluRanking = 6;
			} else if (vluPercent < 71.00) {
			  vluRanking = 7;
			} else if (vluPercent < 84.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 84.00) {
			  vluRanking = 9;
			}
		  }
		} else if (entry.numJournals >= 500 && entry.numJournals < 1000) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 8.00) {
			  vluRanking = 1;
			} else if (vluPercent < 13.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 21.00) {
			  vluRanking = 3;
			} else if (vluPercent < 33.00) {
			  vluRanking = 4;
			} else if (vluPercent < 46.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 59.00) {
			  vluRanking = 6;
			} else if (vluPercent < 72.00) {
			  vluRanking = 7;
			} else if (vluPercent < 85.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 85.00) {
			  vluRanking = 9;
			}
		  }
		} else if (entry.numJournals >= 200 && entry.numJournals < 500) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 10.00) {
			  vluRanking = 1;
			} else if (vluPercent < 15.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 23.00) {
			  vluRanking = 3;
			} else if (vluPercent < 35.00) {
			  vluRanking = 4;
			} else if (vluPercent < 48.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 61.00) {
			  vluRanking = 6;
			} else if (vluPercent < 74.00) {
			  vluRanking = 7;
			} else if (vluPercent < 87.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 87.00) {
			  vluRanking = 9;
			}
		  }
		} else if (entry.numJournals >= 50 && entry.numJournals < 200) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 11.00) {
			  vluRanking = 1;
			} else if (vluPercent < 16.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 24.00) {
			  vluRanking = 3;
			} else if (vluPercent < 36.00) {
			  vluRanking = 4;
			} else if (vluPercent < 49.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 62.00) {
			  vluRanking = 6;
			} else if (vluPercent < 75.00) {
			  vluRanking = 7;
			} else if (vluPercent < 88.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 88.00) {
			  vluRanking = 9;
			}
		  }
		} else if (entry.numJournals < 50) {
		  if (entry.qualityIndex == 1) {
			if (vluPercent < 15.00) {
			  vluRanking = 1;
			} else if (vluPercent < 25.00) {
			  vluRanking = 2;
			}
		  } else if (entry.qualityIndex == 2) {
			if (vluPercent < 33.00) {
			  vluRanking = 3;
			} else if (vluPercent < 45.00) {
			  vluRanking = 4;
			} else if (vluPercent < 50.00) {
			  vluRanking = 5;
			}
		  } else if (entry.qualityIndex == 3) {
			if (vluPercent < 66.00) {
			  vluRanking = 6;
			} else if (vluPercent < 79.00) {
			  vluRanking = 7;
			} else if (vluPercent < 92.00) {
			  vluRanking = 8;
			}
		  } else if (entry.qualityIndex == 4) {
			if (vluPercent >= 92.00) {
			  vluRanking = 9;
			}
		  }
		}
    return '';
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  renderTable(dataEntries);
});
